import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logoLight from '../assets/logo-light.svg'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/journal', label: 'Journal' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { owner, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/20 bg-cream-light/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logoLight} alt="RTC Luxury" className="h-11 w-auto" />
        </NavLink>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-body text-[13px] font-medium uppercase tracking-[0.18em] transition-colors ${
                  isActive
                    ? 'text-gold-600'
                    : 'text-emerald-900 hover:text-gold-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {owner ? (
            <>
              <NavLink
                to="/dashboard"
                className="font-body text-[13px] font-medium uppercase tracking-[0.18em] text-emerald-900 hover:text-gold-600"
              >
                {owner.name.split(' ')[0]}'s Account
              </NavLink>
              <button
                onClick={handleLogout}
                className="rounded-full border border-emerald-900 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-900 transition hover:bg-emerald-900 hover:text-cream"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="rounded-full bg-emerald-900 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-cream shadow-gold transition hover:bg-emerald-800"
            >
              Member Login
            </NavLink>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-[1.5px] w-5 bg-emerald-900" />
            <span className="block h-[1.5px] w-5 bg-emerald-900" />
            <span className="block h-[1.5px] w-5 bg-emerald-900" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-gold-500/20 bg-cream-light px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-900"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {owner ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-900"
                  >
                    {owner.name.split(' ')[0]}'s Account
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full rounded-full border border-emerald-900 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-emerald-900"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="mt-2 block w-full rounded-full bg-emerald-900 px-6 py-2.5 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-cream"
                >
                  Member Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  )
}
