import { Link } from 'react-router-dom'
import logoDark from '../assets/logo-dark.svg'

const columns = [
  {
    title: 'For Travelers',
    links: [
      { label: 'Browse Residences', to: '/properties' },
      { label: 'How It Works', to: '/about' },
      { label: 'Concierge Services', to: '/contact' },
      { label: 'Help Center', to: '/contact' },
    ],
  },
  {
    title: 'For Owners',
    links: [
      { label: 'List Your Residence', to: '/contact' },
      { label: 'Owner Stories', to: '/journal' },
      { label: 'Why Verify', to: '/about' },
      { label: 'Owner Support', to: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Journal', to: '/journal' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', to: '/contact' },
      { label: 'Privacy Policy', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <img src={logoDark} alt="RTC Luxury" className="h-10 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              The private, high-end collection from Resort Travel Club &mdash; hand-verified
              residences at the world&rsquo;s most exclusive resorts.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Verified Owners', 'Concierge Support', 'Scam-Free'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-gold-500/40 px-3 py-1 text-[11px] uppercase tracking-wide text-gold-400"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm italic text-gold-400">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-cream/80 transition hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} RTC Luxury, a Resort Travel Club brand. All rights reserved.</p>
          <p className="italic">Crafted for the discerning traveler.</p>
        </div>
      </div>
    </footer>
  )
}
