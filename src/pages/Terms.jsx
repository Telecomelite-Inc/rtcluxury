import PageHeader from '../components/PageHeader.jsx'

export default function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms and Conditions"
        subtitle="Please read these terms carefully before purchasing an advertising package."
      />

      <section className="mx-auto max-w-4xl px-6 py-16 text-sm leading-relaxed text-emerald-950/80 lg:px-10">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-xl italic text-emerald-950">Who we are</h2>
            <p className="mt-3">
              RTCLuxury.com is operated by Resort Travel Club, Inc., doing business as RTC
              Luxury (&ldquo;RTC Luxury,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). These Terms and Conditions govern your
              purchase and use of our services.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">Our service</h2>
            <p className="mt-3">
              RTC Luxury provides a one-time advertising package to timeshare owners. We create
              and publish advertising for a customer&rsquo;s timeshare interest so that it can be
              seen by prospective renters or buyers. RTC Luxury is not a travel agency, booking
              site, or vacation club, and we do not sell memberships.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">What we do not do</h2>
            <p className="mt-3">
              RTC Luxury does not book travel, rent properties, or collect any traveler or
              rental funds on behalf of our customers. Any rental or resale arrangement is
              negotiated directly between the timeshare owner and a prospective renter or buyer;
              RTC Luxury is not a party to that arrangement and is not responsible for its
              outcome.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">Payment and start of advertising</h2>
            <p className="mt-3">
              Advertising is a one-time fee, paid in advance. Your advertising campaign begins
              once payment has been received and your advertising agreement has been signed.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">Refunds</h2>
            <p className="mt-3">
              Refund requests must be made within 10 days of the date of your signed advertising
              agreement. Refunds are otherwise governed by, and limited to, the terms set out in
              that signed advertising agreement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl italic text-emerald-950">Contact us</h2>
            <p className="mt-3">
              Resort Travel Club, Inc. DBA RTC Luxury
              <br />
              333 S. Garland Ave, Floor 13
              <br />
              Orlando, FL 32801
              <br />
              877-244-1413
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
