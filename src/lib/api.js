export const API_BASE = 'https://rtcluxury-api.admin5953.workers.dev'

export async function apiFetch(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

let data = {}
  try {
    data = await res.json()
  } catch {
  }

if (!res.ok) {
  throw new Error(data.error || 'Something went wrong.')
}
  return data
}
