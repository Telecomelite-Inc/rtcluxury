import { Link } from 'react-router-dom'
import { featuredListings } from '../data/listings.js'
import ListingCard from './ListingCard.jsx'

export default function FeaturedListings() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest-lg text-gold-600">
              Featured Residences
            </p>
            <h2 className="mt-3 font-display text-3xl italic text-emerald-950 sm:text-4xl">
              Handpicked from the private collection
            </h2>
          </div>
          <Link
            to="/properties"
            className="shrink-0 rounded-full border border-emerald-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-emerald-900 transition hover:bg-emerald-900 hover:text-cream"
          >
            View All Residences
          </Link>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((listing) => (
            <Link key={listing.id} to="/properties">
              <ListingCard listing={listing} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
