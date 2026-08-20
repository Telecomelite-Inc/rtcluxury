import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import MyListings from '../components/dashboard/MyListings.jsx'
import Profile from '../components/dashboard/Profile.jsx'
import Inquiries from '../components/dashboard/Inquiries.jsx'

const TABS = [
  { key: 'listings', label: 'My Listings' },
  { key: 'inquiries', label: 'Inquiries' },
  { key: 'profile', label: 'Personal Info' },
]

export default function Dashboard() {
  const { owner } = useAuth()
  const [tab, setTab] = useState('listings')

  return (
    <>
      <PageHeader
        eyebrow="Owner Portal"
        title={`Welcome back, ${owner.name.split(' ')[0]}`}
        subtitle="Manage your listings, review guest inquiries, and keep your personal information current."
      />

      <section className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
        <div className="flex flex-wrap gap-2 border-b border-gold-500/20 pb-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                tab === t.key
                  ? 'border-emerald-900 bg-emerald-900 text-cream'
                  : 'border-emerald-900/20 text-emerald-900 hover:border-emerald-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'listings' && <MyListings />}
          {tab === 'inquiries' && <Inquiries />}
          {tab === 'profile' && <Profile />}
        </div>
      </section>
    </>
  )
}
