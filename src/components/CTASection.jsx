import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest-lg text-gold-600">
          Ready to Belong?
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl italic text-emerald-950 sm:text-4xl">
          Join a private collection of the world&rsquo;s most exceptional residences
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/properties"
            className="rounded-full bg-emerald-900 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream shadow-gold transition hover:bg-emerald-800"
          >
            Browse Residences
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-emerald-900 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-emerald-900 transition hover:bg-emerald-900 hover:text-cream"
          >
            List Your Residence
          </Link>
        </div>
      </div>
    </section>
  )
}
