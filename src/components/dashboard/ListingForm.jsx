import { useState } from 'react'
import { apiFetch } from '../../lib/api.js'

const TYPES = ['Villa', 'Chalet', 'Penthouse', 'Estate', 'Private Island']

const emptyForm = {
  name: '',
  location: '',
  type: 'Villa',
  image: '',
  nightly: '',
  minNights: 3,
  blurb: '',
  description: '',
  amenities: '',
  status: 'published',
}

export default function ListingForm({ listing, onSaved, onCancel }) {
  const [form, setForm] = useState(listing ? { ...emptyForm, ...listing } : emptyForm)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (listing) {
        await apiFetch(`/listings/${listing.id}`, { method: 'PUT', body: form })
      } else {
        await apiFetch('/listings', { method: 'POST', body: form })
      }
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gold-500/20 bg-cream-light p-6">
      <h3 className="font-display text-lg text-emerald-950">
        {listing ? 'Edit Listing' : 'New Listing'}
      </h3>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
            Residence Name
          </label>
          <input
            required
            value={form.name}
            onChange={change('name')}
            className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
            Location
          </label>
          <input
            required
            value={form.location}
            onChange={change('location')}
            className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
            Type
          </label>
          <select
            value={form.type}
            onChange={change('type')}
            className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
            Nightly Rate ($)
          </label>
          <input
            required
            type="number"
            min="1"
            value={form.nightly}
            onChange={change('nightly')}
            className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
            Minimum Nights
          </label>
          <input
            type="number"
            min="1"
            value={form.minNights}
            onChange={change('minNights')}
            className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
          Image URL
        </label>
        <input
          value={form.image}
          onChange={change('image')}
          placeholder="https://&hellip;"
          className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
          Short Summary <span className="normal-case text-emerald-950/40">(shown on listing cards)</span>
        </label>
        <textarea
          rows={3}
          value={form.blurb}
          onChange={change('blurb')}
          className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
          Full Description <span className="normal-case text-emerald-950/40">(shown on the listing page)</span>
        </label>
        <textarea
          rows={6}
          value={form.description}
          onChange={change('description')}
          placeholder="Describe the residence in detail — layout, views, standout features&hellip;"
          className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
          Amenities <span className="normal-case text-emerald-950/40">(comma-separated)</span>
        </label>
        <input
          value={form.amenities}
          onChange={change('amenities')}
          placeholder="Private Pool, Ocean View, Chef on Request, Wi-Fi"
          className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
          Status
        </label>
        <select
          value={form.status}
          onChange={change('status')}
          className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none sm:max-w-xs"
        >
          <option value="published">Published</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-emerald-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream shadow-gold transition hover:bg-emerald-800 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Listing'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-emerald-900/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-emerald-900 transition hover:border-emerald-900"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
