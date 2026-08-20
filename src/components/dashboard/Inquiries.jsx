import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/api.js'

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    apiFetch('/inquiries/mine')
      .then((data) => setInquiries(data.inquiries))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const markRead = async (inquiry) => {
    try {
      await apiFetch(`/inquiries/${inquiry.id}`, { method: 'PUT', body: { status: 'read' } })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h3 className="font-display text-lg text-emerald-950">Inquiries</h3>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {loading ? (
        <p className="mt-6 text-sm text-emerald-950/60">Loading inquiries&hellip;</p>
      ) : inquiries.length === 0 ? (
        <p className="mt-6 text-sm text-emerald-950/60">
          No inquiries yet. When a guest reaches out about one of your residences, it will appear here.
        </p>
      ) : (
        <div className="mt-6 grid gap-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="rounded-2xl border border-gold-500/20 bg-cream-light p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">
                    {inquiry.listingName}
                  </p>
                  <h4 className="font-display text-base text-emerald-950">{inquiry.guestName}</h4>
                  <p className="mt-1 text-xs text-emerald-950/60">
                    {inquiry.guestEmail}
                    {inquiry.guestPhone ? ` · ${inquiry.guestPhone}` : ''}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                    inquiry.status === 'read'
                      ? 'bg-emerald-900/10 text-emerald-900'
                      : 'bg-gold-500/20 text-gold-700'
                  }`}
                >
                  {inquiry.status === 'read' ? 'Read' : 'New'}
                </span>
              </div>

              {(inquiry.checkIn || inquiry.checkOut) && (
                <p className="mt-3 text-xs text-emerald-950/70">
                  Requested dates: {inquiry.checkIn || 'flexible'} &rarr; {inquiry.checkOut || 'flexible'}
                </p>
              )}

              {inquiry.message && (
                <p className="mt-3 text-sm text-emerald-950/80">{inquiry.message}</p>
              )}

              {inquiry.status !== 'read' && (
                <button
                  onClick={() => markRead(inquiry)}
                  className="mt-4 rounded-full border border-emerald-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-900 transition hover:border-emerald-900"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
