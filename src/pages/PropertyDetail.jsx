import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InquireModal from '../components/InquireModal.jsx'
import { listings as staticListings } from '../data/listings.js'
import { apiFetch } from '../lib/api.js'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1600&q=80'

export default function PropertyDetail() {
  const { id } = useParams()
  const [liveListings, setLiveListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [inquiring, setInquiring] = useState(false)

  useEffect(() => {
    let cancelled = false
    apiFetch('/listings')
      .then((data) => {
        if (!cancelled) setLiveListings(data.listings.map((l) => ({ ...l, isLive: true })))
      })
      .catch(() => {
        if (!cancelled) setLiveListings([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const allListings = useMemo(() => [...liveListings, ...staticListings], [liveListings])
  const listing = useMemo(() => allListings.find((l) => String(l.id) === id), [allListings, id])

  if (loading) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
        <p className="text-sm text-emerald-950/60">Loading residence&hellip;</p>
      </section>
    )
  }

  if (!listing) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-10">
        <p className="font-display text-2xl text-emerald-950">Residence not found</p>
        <p className="mt-3 text-sm text-emerald-950/60">
          This listing may have been removed, or the link is out of date.
        </p>
        <Link
          to="/properties"
          className="mt-6 inline-block rounded-full bg-emerald-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream"
        >
          Back to Properties
        </Link>
      </section>
    )
  }

  const hasRating = typeof listing.rating === 'number'

  return (
    <>
      <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden bg-emerald-950">
        <img
          src={listing.image || FALLBACK_IMAGE}
          alt={listing.name}
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 pb-8 lg:px-10">
          <Link
            to="/properties"
            className="text-xs font-semibold uppercase tracking-wide text-cream/70 transition hover:text-gold-400"
          >
            &larr; Back to Properties
          </Link>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gold-400">
            {listing.location}
          </p>
          <h1 className="mt-1 font-display text-3xl italic text-cream sm:text-4xl">{listing.name}</h1>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4 border-b border-gold-500/15 pb-6">
              <span className="rounded-full border border-emerald-900/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-900">
                {listing.type}
              </span>
              {hasRating && (
                <div className="flex items-center gap-1 text-sm text-emerald-950">
                  <span className="text-gold-500">&#9733;</span>
                  <span className="font-medium">{listing.rating.toFixed(1)}</span>
                  <span className="text-emerald-950/50">({listing.reviews} reviews)</span>
                </div>
              )}
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-950/50">
                {listing.minNights} night minimum
              </span>
            </div>

            <h2 className="mt-6 font-display text-xl text-emerald-950">About this residence</h2>
            <p className="mt-3 text-sm leading-relaxed text-emerald-950/70">{listing.blurb}</p>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-gold-500/15 bg-cream-light p-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(listing.owner)}&background=0E3B31&color=E9C874&size=64`}
                alt={listing.owner}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-950/50">Hosted by</p>
                <p className="text-sm font-semibold text-emerald-950">{listing.owner}</p>
              </div>
              <span className="ml-auto rounded-full bg-emerald-950/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-400">
                Verified Owner
              </span>
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-2xl border border-gold-500/20 bg-cream-light p-6 shadow-sm">
              <p className="font-display text-2xl text-emerald-950">
                ${listing.nightly.toLocaleString()}
                <span className="font-sans text-sm font-normal text-emerald-950/50"> / night</span>
              </p>
              <p className="mt-1 text-xs text-emerald-950/50">{listing.minNights} night minimum stay</p>

              {listing.isLive ? (
                <button
                  onClick={() => setInquiring(true)}
                  className="mt-6 w-full rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream shadow-gold transition hover:bg-emerald-800"
                >
                  Inquire
                </button>
              ) : (
                <>
                  <p className="mt-6 text-xs leading-relaxed text-emerald-950/60">
                    This is a preview listing from our curated collection. Reach out and our concierge
                    team will follow up with you directly.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 block w-full rounded-full border border-emerald-900 py-3 text-center text-sm font-semibold uppercase tracking-wide text-emerald-900 transition hover:bg-emerald-900 hover:text-cream"
                  >
                    Contact Concierge
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {inquiring && <InquireModal listing={listing} onClose={() => setInquiring(false)} />}
    </>
  )
}
