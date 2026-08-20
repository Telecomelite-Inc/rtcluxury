import { useState } from 'react'
import { apiFetch } from '../lib/api.js'

export default function InquireModal({ listing, onClose }) {
  const [form, setForm] = useState({ guestName: '', guestEmail: '', guestPhone: '', checkIn: '', checkOut: '', message: '' })
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSending(true)
    try {
      await apiFetch('/inquiries', { method: 'POST', body: { listingId: listing.id, ...form } })
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-emerald-950/60 px-4 py-8" onClick={onClose}>
      <div
        className="max-h-full w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">{listing.location}</p>
            <h3 className="font-display text-lg text-emerald-950">{listing.name}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-emerald-950/50 hover:text-emerald-950">
            ✕
          </button>
        </div>

        {sent ? (
          <div className="py-6 text-center">
            <p className="font-display text-lg text-emerald-950">Inquiry sent</p>
            <p className="mt-2 text-sm text-emerald-950/70">
              The owner has been notified and will follow up with you directly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-emerald-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">Name</label>
              <input
                required
                value={form.guestName}
                onChange={change('guestName')}
                className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">Email</label>
                <input
                  required
                  type="email"
                  value={form.guestEmail}
                  onChange={change('guestEmail')}
                  className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">Phone</label>
                <input
                  type="tel"
                  value={form.guestPhone}
                  onChange={change('guestPhone')}
                  className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
                  Check-in
                </label>
                <input
                  type="date"
                  value={form.checkIn}
                  onChange={change('checkIn')}
                  className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
                  Check-out
                </label>
                <input
                  type="date"
                  value={form.checkOut}
                  onChange={change('checkOut')}
                  className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">Message</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={change('message')}
                className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream shadow-gold transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {sending ? 'Sending…' : 'Send Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
