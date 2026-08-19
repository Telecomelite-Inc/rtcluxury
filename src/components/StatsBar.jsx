import { stats } from '../data/listings.js'

export default function StatsBar() {
  return (
    <section className="border-b border-gold-500/15 bg-emerald-900">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 text-center lg:grid-cols-4 lg:px-10">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl italic text-gold-400 sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest-lg text-cream/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
