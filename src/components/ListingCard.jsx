export default function ListingCard({ listing, onInquire }) {
  const hasRating = typeof listing.rating === 'number'
  return (
    <article className="group overflow-hidden rounded-2xl border border-gold-500/15 bg-cream-light shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image || 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1200&q=80'}
          alt={listing.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-emerald-950/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-400 backdrop-blur">
          Verified Owner
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">
              {listing.location}
            </p>
            <h3 className="mt-1 font-display text-lg text-emerald-950">{listing.name}</h3>
          </div>
          {hasRating && (
            <div className="flex shrink-0 items-center gap-1 text-sm text-emerald-950">
              <span className="text-gold-500">&#9733;</span>
              <span className="font-medium">{listing.rating.toFixed(1)}</span>
              <span className="text-emerald-950/50">({listing.reviews})</span>
            </div>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-emerald-950/70">{listing.blurb}</p>
        <div className="mt-4 flex items-center justify-between border-t border-gold-500/15 pt-4">
          <div className="flex items-center gap-2">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(listing.owner)}&background=0E3B31&color=E9C874&size=64`}
              alt={listing.owner}
              className="h-7 w-7 rounded-full"
            />
            <span className="text-xs text-emerald-950/70">{listing.owner}</span>
          </div>
          <div className="text-right">
            <p className="font-display text-base text-emerald-950">${listing.nightly.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-950/50">per night &middot; {listing.minNights} night min</p>
          </div>
        </div>
        {onInquire && (
          <button
            onClick={() => onInquire(listing)}
            className="mt-4 w-full rounded-full border border-emerald-900 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-900 transition hover:bg-emerald-900 hover:text-cream"
          >
            Inquire
          </button>
        )}
      </div>
    </article>
  )
}
