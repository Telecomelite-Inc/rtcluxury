import PageHeader from '../components/PageHeader.jsx'

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How Resort Travel Club, Inc. DBA RTC Luxury collects, uses, and protects your information."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 text-sm leading-relaxed text-emerald-950/80 lg:px-10">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl italic text-emerald-950">Information we collect</h2>
            <p className="mt-3">
              When you use this site or purchase an advertising package, we may collect
              information such as your name, contact details (email, phone, mailing address),
              details about your timeshare, and payment information needed to complete your
              purchase.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">Payment information</h2>
            <p className="mt-3">
              Payment card information is processed by our payment processor and is not stored
              by RTC Luxury beyond what is needed to complete your purchase.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">How we use your information</h2>
            <p className="mt-3">
              We use the information we collect to provide our one-time advertising service,
              respond to customer support requests, and for other legitimate business purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">No sale of personal information</h2>
            <p className="mt-3">RTC Luxury does not sell your personal information.</p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">Contact us</h2>
            <p className="mt-3">
              For questions about this Privacy Policy, contact us at:
              <br />
              Resort Travel Club, Inc. DBA RTC Luxury
              <br />
              333 S. Garland Ave, Floor 13
              <br />
              Orlando, FL 32801
              <br />
              877-244-1413
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-950/50">Effective date: September 2026</p>
          </div>
        </div>
      </section>
    </>
  )
}
