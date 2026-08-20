# RTC Luxury — Owner Portal API

A small Cloudflare Worker (no external dependencies) backing the Member Login and owner
dashboard on rtcluxury.com. Handles owner signup and login, profile edits, listing CRUD,
and inquiries, backed by the rtcluxury-db D1 database.

## Deployment

This deploys automatically via .github/workflows/deploy-api.yml on every push to main
that touches this folder. That workflow needs two GitHub Actions secrets set once, added
under the repo's Settings, then Secrets and variables, then Actions, then New repository
secret: CLOUDFLARE_API_TOKEN (a Cloudflare API token with Workers Scripts Edit and D1
Edit permissions) and CLOUDFLARE_ACCOUNT_ID (found on the right sidebar of the Cloudflare
dashboard).

## Local development

Run npx wrangler dev from inside this folder.

## Endpoints

POST /signup, POST /login, POST /logout, GET /me, PUT /me, GET /listings (public), GET
/listings/mine, POST /listings, PUT /listings/:id, DELETE /listings/:id, POST /inquiries
(public), GET /inquiries/mine, PUT /inquiries/:id.

Sessions are an HttpOnly cookie, valid 30 days, checked against a sessions table in D1,
not a signed JWT, so a logout can simply delete the row.

## Note on bulk or manual account creation

Accounts created by your team from phone sales, via a separate system your programmer
builds later, can be inserted directly into the owners table in rtcluxury-db. The schema
is intentionally simple (id, email, password_hash, password_salt, name, phone). Passwords
are PBKDF2-SHA256 with 100,000 iterations, see hashPassword() in src/index.js for the
exact scheme to match if generating hashes outside this Worker.
