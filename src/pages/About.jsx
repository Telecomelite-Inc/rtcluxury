import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const pillars = [
  {
    title: 'Verified Ownership',
    body: 'Every residence is confirmed against deed and title records before it is ever listed. No exceptions.',
  },
  {
    title: 'In-Person Inspection',
    body: 'Our team or a trusted local partner walks every property before it joins the collection — photos must match reality.',
  },
  {
    title: 'Private Concierge',
    body: 'From first inquiry to checkout, a dedicated concierge is available to arrange transport, chefs, and experiences.',
  },
  {
    title: 'Discretion First',
    body: 'Members and owners alike can request fully private listings, visible only to pre-approved travelers.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About RTC Luxury"
        title="The private collection from Resort Travel Club"
        subtitle="RTC Luxury was created for one reason: to give discerning travelers a smaller, more rigorously verified circle of the world's finest resort residences."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <p className="font-display text-2xl italic leading-relaxed text-emerald-950">
          Resort Travel Club built its reputation on trust — verified timeshare owners,
          scam-free bookings, and thousands of happy travelers. RTC Luxury takes that same
          promise and raises it to the level our most discerning members were asking for.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-emerald-950/75">
          Every estate, villa and penthouse in the RTC Luxury collection is nominated by its
          owner and admitted only after our verification team confirms ownership, inspects the
          property, and reviews its history. It is a smaller collection by design &mdash; and a
          more accountable one.
        </p>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest-lg text-gold-600">
              What Sets Us Apart
            </p>
            <h2 className="mt-3 font-display text-3xl italic text-emerald-950 sm:text-4xl">
              Membership built on trust
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-gold-500/20 bg-cream-light p-7">
                <h3 className="font-display text-xl text-emerald-950">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-950/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10">
        <h2 className="font-display text-2xl italic text-emerald-950 sm:text-3xl">
          Own an exceptional property?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-emerald-950/70">
          We&rsquo;re accepting applications from owners of qualifying villas, estates and
          resort residences worldwide.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex rounded-full bg-emerald-900 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream shadow-gold transition hover:bg-emerald-800"
        >
          Apply as an Owner
        </Link>
      </section>
    </>
  )
}
