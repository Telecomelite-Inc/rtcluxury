import PageHeader from '../components/PageHeader.jsx'
import { articles } from '../data/journal.js'

export default function Journal() {
  return (
    <>
      <PageHeader
        eyebrow="The Journal"
        title="Stories from the collection"
        subtitle="Destination guides, owner spotlights, and a closer look at how the RTC Luxury collection is curated."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-2xl border border-gold-500/15 bg-cream-light shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-600">
                  {article.category} &middot; {article.date}
                </p>
                <h3 className="mt-2 font-display text-xl text-emerald-950">{article.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-950/70">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
