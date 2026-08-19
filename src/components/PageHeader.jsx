export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-emerald-950">
      <div className="absolute inset-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1596746698204-d69844da956d?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center lg:px-10">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest-lg text-gold-400">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl italic text-cream sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/75 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
