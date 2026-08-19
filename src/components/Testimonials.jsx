import { testimonials } from '../data/listings.js'

export default function Testimonials() {
  return (
    <section className="bg-emerald-950 text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest-lg text-gold-400">
            Trusted by Members Worldwide
          </p>
          <h2 className="mt-3 font-display text-3xl italic text-cream sm:text-4xl">
            Loved by travelers and owners alike
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-gold-500/20 bg-emerald-900/60 p-7"
            >
              <p className="font-display text-lg italic leading-relaxed text-cream/95">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-5 text-sm">
                <p className="font-semibold text-gold-400">{t.name}</p>
                <p className="text-cream/60">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
