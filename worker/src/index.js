// RTC Luxury — Owner Portal API
// Plain Cloudflare Worker (no external dependencies) backed by a D1 database.
// Handles owner signup/login, profile edits, listing CRUD, and inquiries.

const ALLOWED_ORIGINS = new Set([
'https://rtcluxury.com',
'https://www.rtcluxury.com',
'http://localhost:5173',
]);

const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

export default {
async fetch(request, env) {
const url = new URL(request.url);
const origin = request.headers.get('Origin') || '';
const cors = corsHeaders(origin);

if (request.method === 'OPTIONS') {
return new Response(null, { status: 204, headers: cors });
}

try {
const res = await route(request, env, url);
const headers = new Headers(res.headers);
for (const [k, v] of Object.entries(cors)) headers.set(k, v);
return new Response(res.body, { status: res.status, headers });
} catch (err) {
const headers = new Headers({ 'Content-Type': 'application/json', ...cors });
return new Response(JSON.stringify({ error: err.message || 'Server error' }), {
status: 500,
headers,
});
}
},
};

async function route(request, env, url) {
const { pathname } = url;
const method = request.method;

if (pathname === '/signup' && method === 'POST') return handleSignup(request, env);
if (pathname === '/login' && method === 'POST') return handleLogin(request, env);
if (pathname === '/logout' && method === 'POST') return handleLogout(request, env);
if (pathname === '/me' && method === 'GET') return handleMe(request, env);
if (pathname === '/me' && method === 'PUT') return handleUpdateMe(request, env);
if (pathname === '/listings' && method === 'GET') return handlePublicListings(env);
if (pathname === '/listings/mine' && method === 'GET') return handleMyListings(request, env);
if (pathname === '/listings' && method === 'POST') return handleCreateListing(request, env);

const listingMatch = pathname.match(/^\/listings\/([\w-]+)$/);
if (listingMatch && method === 'PUT') return handleUpdateListing(request, env, listingMatch[1]);
if (listingMatch && method === 'DELETE') return handleDeleteListing(request, env, listingMatch[1]);

if (pathname === '/inquiries' && method === 'POST') return handleCreateInquiry(request, env);
if (pathname === '/inquiries/mine' && method === 'GET') return handleMyInquiries(request, env);

const inquiryMatch = pathname.match(/^\/inquiries\/([\w-]+)$/);
if (inquiryMatch && method === 'PUT') return handleUpdateInquiry(request, env, inquiryMatch[1]);

return json({ error: 'Not found' }, 404);
}

// ---------- Auth handlers ----------

async function handleSignup(request, env) {
const body = await readJson(request);
const { name, email, phone, password } = body;
if (!name || !email || !password) {
return json({ error: 'Name, email, and password are required.' }, 400);
}
if (String(password).length < 8) {
return json({ error: 'Password must be at least 8 characters.' }, 400);
}
const normalizedEmail = String(email).trim().toLowerCase();
const existing = await env.DB.prepare('SELECT id FROM owners WHERE email = ?')
.bind(normalizedEmail)
.first();
if (existing) return json({ error: 'An account with that email already exists.' }, 409);

const { hash, salt } = await hashPassword(password);
const id = crypto.randomUUID();
await env.DB.prepare(
'INSERT INTO owners (id, email, password_hash, password_salt, name, phone) VALUES (?, ?, ?, ?, ?, ?)'
)
.bind(id, normalizedEmail, hash, salt, name, phone || null)
.run();

return startSession(env, id, { id, name, email: normalizedEmail, phone: phone || null });
}

async function handleLogin(request, env) {
const body = await readJson(request);
const { email, password } = body;
if (!email || !password) return json({ error: 'Email and password are required.' }, 400);

const normalizedEmail = String(email).trim().toLowerCase();
const row = await env.DB.prepare('SELECT * FROM owners WHERE email = ?')
.bind(normalizedEmail)
.first();
if (!row) return json({ error: 'Invalid email or password.' }, 401);

const ok = await verifyPassword(password, row.password_salt, row.password_hash);
if (!ok) return json({ error: 'Invalid email or password.' }, 401);

return startSession(env, row.id, {
id: row.id,
name: row.name,
email: row.email,
phone: row.phone,
});
}

async function handleLogout(request, env) {
const token = parseCookies(request).session;
if (token) await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
return json({ ok: true }, 200, { 'Set-Cookie': clearSessionCookieHeader() });
}

async function handleMe(request, env) {
const owner = await getOwnerFromRequest(request, env);
if (!owner) return json({ error: 'Not authenticated' }, 401);
return json({ owner });
}

async function handleUpdateMe(request, env) {
const owner = await getOwnerFromRequest(request, env);
if (!owner) return json({ error: 'Not authenticated' }, 401);

const body = await readJson(request);
const { name, phone, email, password, currentPassword } = body;
const updates = [];
const values = [];

if (name) {
updates.push('name = ?');
values.push(name);
}
if (phone !== undefined) {
updates.push('phone = ?');
values.push(phone || null);
}
if (email) {
const normalizedEmail = String(email).trim().toLowerCase();
if (normalizedEmail !== owner.email) {
const existing = await env.DB.prepare('SELECT id FROM owners WHERE email = ? AND id != ?')
.bind(normalizedEmail, owner.id)
.first();
if (existing) return json({ error: 'That email is already in use.' }, 409);
updates.push('email = ?');
values.push(normalizedEmail);
}
}
if (password) {
if (!currentPassword) {
return json({ error: 'Current password is required to set a new password.' }, 400);
}
const row = await env.DB.prepare('SELECT password_hash, password_salt FROM owners WHERE id = ?')
.bind(owner.id)
.first();
const ok = await verifyPassword(currentPassword, row.password_salt, row.password_hash);
if (!ok) return json({ error: 'Current password is incorrect.' }, 401);
if (String(password).length < 8) {
return json({ error: 'New password must be at least 8 characters.' }, 400);
}
const { hash, salt } = await hashPassword(password);
updates.push('password_hash = ?', 'password_salt = ?');
values.push(hash, salt);
}

if (updates.length === 0) return json({ error: 'Nothing to update.' }, 400);

values.push(owner.id);
await env.DB.prepare(`UPDATE owners SET ${updates.join(', ')} WHERE id = ?`)
.bind(...values)
.run();

const updated = await env.DB.prepare('SELECT id, name, email, phone FROM owners WHERE id = ?')
.bind(owner.id)
.first();
return json({ owner: updated });
}

// ---------- Listing handlers ----------

async function handlePublicListings(env) {
const { results } = await env.DB.prepare(
`SELECT l.id, l.name, l.location, l.type, l.image, l.nightly, l.min_nights AS minNights,
l.blurb, l.description, l.amenities, o.name AS owner
FROM listings l
JOIN owners o ON o.id = l.owner_id
WHERE l.status = 'published'
ORDER BY l.created_at DESC`
).all();
return json({ listings: results });
}

async function handleMyListings(request, env) {
const owner = await getOwnerFromRequest(request, env);
if (!owner) return json({ error: 'Not authenticated' }, 401);
const { results } = await env.DB.prepare(
`SELECT id, name, location, type, image, nightly, min_nights AS minNights, blurb, description, amenities, status, created_at AS createdAt
FROM listings WHERE owner_id = ? ORDER BY created_at DESC`
)
.bind(owner.id)
.all();
return json({ listings: results });
}

function validateListingBody(body) {
const { name, location, type, nightly } = body;
if (!name || !location || !type || !nightly) {
return 'Name, location, type, and nightly rate are required.';
}
if (Number.isNaN(Number(nightly)) || Number(nightly) <= 0) {
return 'Nightly rate must be a positive number.';
}
return null;
}

async function handleCreateListing(request, env) {
const owner = await getOwnerFromRequest(request, env);
if (!owner) return json({ error: 'Not authenticated' }, 401);
const body = await readJson(request);
const err = validateListingBody(body);
if (err) return json({ error: err }, 400);

const id = crypto.randomUUID();
await env.DB.prepare(
`INSERT INTO listings (id, owner_id, name, location, type, image, nightly, min_nights, blurb, description, amenities, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`
)
.bind(
id,
owner.id,
body.name,
body.location,
body.type,
body.image || null,
Number(body.nightly),
Number(body.minNights) || 1,
body.blurb || '',
body.description || '',
body.amenities || ''
)
.run();

return json({ id }, 201);
}

async function handleUpdateListing(request, env, id) {
const owner = await getOwnerFromRequest(request, env);
if (!owner) return json({ error: 'Not authenticated' }, 401);
const existing = await env.DB.prepare('SELECT owner_id FROM listings WHERE id = ?').bind(id).first();
if (!existing) return json({ error: 'Listing not found.' }, 404);
if (existing.owner_id !== owner.id) return json({ error: 'Forbidden' }, 403);

const body = await readJson(request);
const err = validateListingBody(body);
if (err) return json({ error: err }, 400);

await env.DB.prepare(
`UPDATE listings
SET name=?, location=?, type=?, image=?, nightly=?, min_nights=?, blurb=?, description=?, amenities=?, status=?, updated_at=datetime('now')
WHERE id=?`
)
.bind(
body.name,
body.location,
body.type,
body.image || null,
Number(body.nightly),
Number(body.minNights) || 1,
body.blurb || '',
body.description || '',
body.amenities || '',
body.status || 'published',
id
)
.run();

return json({ ok: true });
}

async function handleDeleteListing(request, env, id) {
const owner = await getOwnerFromRequest(request, env);
if (!owner) return json({ error: 'Not authenticated' }, 401);
const existing = await env.DB.prepare('SELECT owner_id FROM listings WHERE id = ?').bind(id).first();
if (!existing) return json({ error: 'Listing not found.' }, 404);
if (existing.owner_id !== owner.id) return json({ error: 'Forbidden' }, 403);

await env.DB.prepare('DELETE FROM listings WHERE id = ?').bind(id).run();
await env.DB.prepare('DELETE FROM inquiries WHERE listing_id = ?').bind(id).run();
return json({ ok: true });
}

// ---------- Inquiry handlers ----------

async function handleCreateInquiry(request, env) {
const body = await readJson(request);
const { listingId, guestName, guestEmail, guestPhone, message, checkIn, checkOut, guests } = body;
if (!listingId || !guestName || !guestEmail) {
return json({ error: 'Listing, name, and email are required.' }, 400);
}
const listing = await env.DB.prepare('SELECT owner_id FROM listings WHERE id = ?')
.bind(listingId)
.first();
if (!listing) return json({ error: 'Listing not found.' }, 404);

const id = crypto.randomUUID();
await env.DB.prepare(
`INSERT INTO inquiries (id, listing_id, owner_id, guest_name, guest_email, guest_phone, message, check_in, check_out, guests)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
)
.bind(
id,
listingId,
listing.owner_id,
guestName,
guestEmail,
guestPhone || null,
message || '',
checkIn || null,
checkOut || null,
Number(guests) || null
)
.run();

return json({ ok: true }, 201);
}

async function handleMyInquiries(request, env) {
const owner = await getOwnerFromRequest(request, env);
if (!owner) return json({ error: 'Not authenticated' }, 401);
const { results } = await env.DB.prepare(
`SELECT i.id, i.guest_name AS guestName, i.guest_email AS guestEmail, i.guest_phone AS guestPhone,
i.message, i.check_in AS checkIn, i.check_out AS checkOut, i.guests, i.status, i.created_at AS createdAt,
l.name AS listingName
FROM inquiries i
JOIN listings l ON l.id = i.listing_id
WHERE i.owner_id = ?
ORDER BY i.created_at DESC`
)
.bind(owner.id)
.all();
return json({ inquiries: results });
}

async function handleUpdateInquiry(request, env, id) {
const owner = await getOwnerFromRequest(request, env);
if (!owner) return json({ error: 'Not authenticated' }, 401);
const existing = await env.DB.prepare('SELECT owner_id FROM inquiries WHERE id = ?').bind(id).first();
if (!existing) return json({ error: 'Inquiry not found.' }, 404);
if (existing.owner_id !== owner.id) return json({ error: 'Forbidden' }, 403);

const body = await readJson(request);
const status = body.status || 'read';
await env.DB.prepare('UPDATE inquiries SET status = ? WHERE id = ?').bind(status, id).run();
return json({ ok: true });
}

// ---------- Session helpers ----------

async function startSession(env, ownerId, ownerPayload) {
const token = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
const expires = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000).toISOString();
await env.DB.prepare('INSERT INTO sessions (token, owner_id, expires_at) VALUES (?, ?, ?)')
.bind(token, ownerId, expires)
.run();
return json(
{ owner: ownerPayload },
200,
{ 'Set-Cookie': sessionCookieHeader(token, SESSION_MAX_AGE_SECONDS) }
);
}

async function getOwnerFromRequest(request, env) {
const token = parseCookies(request).session;
if (!token) return null;
const row = await env.DB.prepare(
`SELECT o.id, o.name, o.email, o.phone, s.expires_at AS expiresAt
FROM sessions s JOIN owners o ON o.id = s.owner_id
WHERE s.token = ?`
)
.bind(token)
.first();
if (!row) return null;
if (new Date(row.expiresAt) < new Date()) return null;
return { id: row.id, name: row.name, email: row.email, phone: row.phone };
}

function sessionCookieHeader(token, maxAgeSeconds) {
return `session=${token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=${maxAgeSeconds}`;
}

function clearSessionCookieHeader() {
return 'session=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0';
}

function parseCookies(request) {
const header = request.headers.get('Cookie') || '';
const cookies = {};
header.split(';').forEach((pair) => {
const idx = pair.indexOf('=');
if (idx === -1) return;
cookies[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim();
});
return cookies;
}

// ---------- Password hashing (PBKDF2-SHA256, no external deps) ----------

async function hashPassword(password, saltHex) {
const salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
const keyMaterial = await crypto.subtle.importKey(
'raw',
new TextEncoder().encode(password),
'PBKDF2',
false,
['deriveBits']
);
const bits = await crypto.subtle.deriveBits(
{ name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
keyMaterial,
256
);
return { hash: bytesToHex(new Uint8Array(bits)), salt: bytesToHex(salt) };
}

async function verifyPassword(password, saltHex, hashHex) {
const { hash } = await hashPassword(password, saltHex);
if (hash.length !== hashHex.length) return false;
let diff = 0;
for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ hashHex.charCodeAt(i);
return diff === 0;
}

function bytesToHex(bytes) {
return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex) {
const bytes = new Uint8Array(hex.length / 2);
for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
return bytes;
}

// ---------- Misc helpers ----------

async function readJson(request) {
try {
return await request.json();
} catch {
return {};
}
}

function json(data, status = 200, extraHeaders = {}) {
return new Response(JSON.stringify(data), {
status,
headers: { 'Content-Type': 'application/json', ...extraHeaders },
});
}

function corsHeaders(origin) {
const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : '';
return {
'Access-Control-Allow-Origin': allowOrigin,
'Access-Control-Allow-Credentials': 'true',
'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type',
Vary: 'Origin',
};
}
