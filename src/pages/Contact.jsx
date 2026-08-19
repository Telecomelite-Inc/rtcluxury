import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'

const reasons = ['General Inquiry', 'I want to book a residence', 'I want to list my residence', 'Press & Partnerships']

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Speak with our concierge team"
        subtitle="Whether you're planning a stay or considering listing your residence, our team typically responds within a few hours."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-5 lg:px-10">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl italic text-emerald-950">Contact details</h2>
          <div className="mt-6 space-y-5 text-sm text-emerald-950/75">
            <div>
              <p className="font-semibold uppercase tracking-wide text-gold-600">Concierge Line</p>
              <p className="mt-1">+1 (800) 555-0142</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wide text-gold-600">Email</p>
              <p className="mt-1">concierge@rtcluxury.com</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wide text-gold-600">Owner Applications</p>
              <p className="mt-1">owners@rtcluxury.com</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wide text-gold-600">Hours</p>
              <p className="mt-1">Monday &ndash; Sunday, 7am &ndash; 11pm ET</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {submitted ? (
            <div className="rounded-2xl border border-gold-500/30 bg-cream-light p-10 text-center">
              <p className="font-display text-2xl italic text-emerald-950">Thank you.</p>
              <p className="mt-3 text-sm text-emerald-950/70">
                A member of our concierge team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gold-500/20 bg-cream-light p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-950/60">
                    Full Name
                  </span>
                  <input
                    required
                    type="text"
                    className="mt-1.5 w-full rounded-lg border border-emerald-900/15 bg-white px-4 py-2.5 text-sm text-emerald-950 focus:border-gold-500 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-950/60">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    className="mt-1.5 w-full rounded-lg border border-emerald-900/15 bg-white px-4 py-2.5 text-sm text-emerald-950 focus:border-gold-500 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-950/60">
                  Reason for contact
                </span>
                <select className="mt-1.5 w-full rounded-lg border border-emerald-900/15 bg-white px-4 py-2.5 text-sm text-emerald-950 focus:border-gold-500 focus:outline-none">
                  {reasons.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-emerald-950/60">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  className="mt-1.5 w-full rounded-lg border border-emerald-900/15 bg-white px-4 py-2.5 text-sm text-emerald-950 focus:border-gold-500 focus:outline-none"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-emerald-900 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cream shadow-gold transition hover:bg-emerald-800 sm:w-auto"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
