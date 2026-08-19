import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import ListingCard from '../components/ListingCard.jsx'
import { listings } from '../data/listings.js'

const types = ['All Types', ...new Set(listings.map((l) => l.type))]

export default function Properties() {
  const [type, setType] = useState('All Types')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesType = type === 'All Types' || l.type === type
      const matchesQuery =
        query.trim() === '' ||
        `${l.name} ${l.location}`.toLowerCase().includes(query.toLowerCase())
      return matchesType && matchesQuery
    })
  }, [type, query])

  return (
    <>
      <PageHeader
        eyebrow="The Private Collection"
        title="Every residence, verified"
        subtitle="Browse the full RTC Luxury collection — each estate personally inspected, each owner background-checked, before it ever reaches this page."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-4 rounded-2xl border border-gold-500/20 bg-cream-light p-5 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by residence or destination&hellip;"
            className="w-full rounded-full border border-emerald-900/15 bg-white px-5 py-2.5 text-sm text-emerald-950 placeholder:text-emerald-950/40 focus:border-gold-500 focus:outline-none sm:max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition ${
                  type === t
                    ? 'border-emerald-900 bg-emerald-900 text-cream'
                    : 'border-emerald-900/20 text-emerald-900 hover:border-emerald-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-emerald-950/60">
          {filtered.length} {filtered.length === 1 ? 'residence' : 'residences'} available
        </p>

        <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-emerald-950/60">
            No residences match that search yet — try a different destination or type.
          </p>
        )}
      </section>
    </>
  )
}
