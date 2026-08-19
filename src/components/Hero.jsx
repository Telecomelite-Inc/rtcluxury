import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/properties')
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1562407184-c5428fdf2cd1?auto=format&fit=crop&w=2000&q=80"
          alt="Infinity pool overlooking the ocean at sunset"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-950/55 to-emerald-950/85" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center lg:pt-36">
        <p className="text-shadow-sm text-xs font-semibold uppercase tracking-widest-lg text-gold-400">
          By Invitation &middot; Verified Ownership
        </p>
        <h1 className="mt-5 font-display text-5xl italic text-cream text-shadow-sm sm:text-6xl lg:text-7xl">
          <span className="not-italic text-cream">RTC</span>{' '}
          <span className="text-gold-400">Luxury</span>
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-widest-lg text-cream/80">
          The Private Collection &#9670; World-Class Resorts
        </p>
        <p className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-cream/90 sm:text-lg">
          Hand-verified villas, penthouses and estates from an exclusive network of owners.
          Every residence inspected, every owner vetted &mdash; reserved for those who expect more.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {['Verified Owners', 'Private Concierge', 'By-Application Only'].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-gold-400/50 bg-emerald-950/40 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-cream backdrop-blur"
            >
              {pill}
            </span>
          ))}
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 rounded-2xl bg-cream-light/95 p-4 shadow-xl backdrop-blur sm:grid-cols-4 sm:gap-0 sm:rounded-full sm:p-2"
        >
          <label className="flex flex-col justify-center px-3 py-1 text-left sm:border-r sm:border-emerald-900/10">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-900/60">
              Destination
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where to?"
              className="bg-transparent text-sm text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none"
            />
          </label>
          <label className="flex flex-col justify-center px-3 py-1 text-left sm:border-r sm:border-emerald-900/10">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-900/60">
              Check-in
            </span>
            <input
              type="date"
              className="bg-transparent text-sm text-emerald-950 focus:outline-none"
            />
          </label>
          <label className="flex flex-col justify-center px-3 py-1 text-left sm:border-r sm:border-emerald-900/10">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-900/60">
              Check-out
            </span>
            <input
              type="date"
              className="bg-transparent text-sm text-emerald-950 focus:outline-none"
            />
          </label>
          <div className="col-span-2 flex items-center gap-2 px-1 sm:col-span-1">
            <label className="flex flex-1 flex-col justify-center px-2 py-1 text-left">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-900/60">
                Guests
              </span>
              <input
                type="number"
                min="1"
                defaultValue={2}
                className="bg-transparent text-sm text-emerald-950 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-gold transition hover:bg-gold-400"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
