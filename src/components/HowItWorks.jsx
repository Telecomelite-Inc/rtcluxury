const travelerSteps = [
  {
    title: 'Browse the collection',
    body: 'Explore hand-verified estates, villas and penthouses filtered by destination, style and season.',
  },
  {
    title: 'Speak with a concierge',
    body: 'Message the owner directly or request a private concierge to arrange every detail on your behalf.',
  },
  {
    title: 'Arrive with confidence',
    body: 'Every ownership claim, photo and amenity is verified in advance — no surprises, ever.',
  },
]

const ownerSteps = [
  {
    title: 'Apply for verification',
    body: 'Submit proof of ownership and identity to be considered for the RTC Luxury collection.',
  },
  {
    title: 'Curate your listing',
    body: 'Our team helps present your residence with professional-grade photography and copy.',
  },
  {
    title: 'Host discerning travelers',
    body: 'Earn from unused weeks while a dedicated team screens every inquiry on your behalf.',
  },
]

function StepList({ eyebrow, steps, cta, to }) {
  return (
    <div className="rounded-3xl border border-gold-500/20 bg-cream-light p-8 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-widest-lg text-gold-600">{eyebrow}</p>
      <ol className="mt-6 space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-500/50 font-display text-sm italic text-gold-600">
              {i + 1}
            </span>
            <div>
              <p className="font-display text-lg text-emerald-950">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-950/70">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <a
        href={to}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-emerald-800"
      >
        {cta}
      </a>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest-lg text-gold-600">
          How It Works
        </p>
        <h2 className="mt-3 font-display text-3xl italic text-emerald-950 sm:text-4xl">
          One private club, two ways to belong
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-emerald-950/70">
          Whether you are seeking an unforgettable escape or hold weeks at an exceptional
          property, every step is verified, discreet, and secure.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <StepList eyebrow="For Travelers" steps={travelerSteps} cta="Browse Residences" to="/properties" />
        <StepList eyebrow="For Owners" steps={ownerSteps} cta="Apply as an Owner" to="/contact" />
      </div>
    </section>
  )
}
