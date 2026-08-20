import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signup(form)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Owner Portal"
        title="Create your owner account"
        subtitle="List your residence with RTC Luxury and manage it directly — availability, details, and guest inquiries, all in one place."
      />

      <section className="mx-auto max-w-md px-6 py-16 lg:px-10">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gold-500/20 bg-cream-light p-6">
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
              Full Name
            </label>
            <input
              required
              value={form.name}
              onChange={change('name')}
              className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
              Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={change('email')}
              className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
              Phone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={change('phone')}
              className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
              Password
            </label>
            <input
              required
              type="password"
              minLength={8}
              value={form.password}
              onChange={change('password')}
              className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-emerald-950/50">At least 8 characters.</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream shadow-gold transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>

          <p className="text-center text-xs text-emerald-950/60">
            Already an owner?{' '}
            <Link to="/login" className="font-semibold text-emerald-900 underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </>
  )
}
