import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/api.js'
import ListingForm from './ListingForm.jsx'

export default function MyListings() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)

  const load = () => {
    setLoading(true)
    apiFetch('/listings/mine')
      .then((data) => setListings(data.listings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleSaved = () => {
    setEditing(null)
    setCreating(false)
    load()
  }

  const handleDelete = async (listing) => {
    if (!window.confirm(`Remove "${listing.name}" from your listings?`)) return
    try {
      await apiFetch(`/listings/${listing.id}`, { method: 'DELETE' })
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  if (creating) {
    return <ListingForm onSaved={handleSaved} onCancel={() => setCreating(false)} />
  }

  if (editing) {
    return <ListingForm listing={editing} onSaved={handleSaved} onCancel={() => setEditing(null)} />
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-emerald-950">My Listings</h3>
        <button
          onClick={() => setCreating(true)}
          className="rounded-full bg-emerald-900 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-cream shadow-gold transition hover:bg-emerald-800"
        >
          Add Listing
        </button>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {loading ? (
        <p className="mt-6 text-sm text-emerald-950/60">Loading your listings&hellip;</p>
      ) : listings.length === 0 ? (
        <p className="mt-6 text-sm text-emerald-950/60">
          You have not added any listings yet. Click "Add Listing" to publish your first residence.
        </p>
      ) : (
        <div className="mt-6 grid gap-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex flex-col gap-3 rounded-2xl border border-gold-500/20 bg-cream-light p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">
                  {listing.location} &middot; {listing.type}
                </p>
                <h4 className="font-display text-base text-emerald-950">{listing.name}</h4>
                <p className="mt-1 text-xs text-emerald-950/60">
                  ${listing.nightly.toLocaleString()} / night &middot;{' '}
                  <span className={listing.status === 'published' ? 'text-emerald-700' : 'text-emerald-950/50'}>
                    {listing.status === 'published' ? 'Published' : 'Hidden'}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(listing)}
                  className="rounded-full border border-emerald-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-900 transition hover:border-emerald-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(listing)}
                  className="rounded-full border border-red-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-red-600 transition hover:border-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
