import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(form)
      const dest = location.state?.from?.pathname || '/dashboard'
      navigate(dest, { replace: true })
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
        title="Member login"
        subtitle="Sign in to manage your listings, personal information, and guest inquiries."
      />

      <section className="mx-auto max-w-md px-6 py-16 lg:px-10">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gold-500/20 bg-cream-light p-6">
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

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
              Password
            </label>
            <input
              required
              type="password"
              value={form.password}
              onChange={change('password')}
              className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-cream shadow-gold transition hover:bg-emerald-800 disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-xs text-emerald-950/60">
            New owner?{' '}
            <Link to="/signup" className="font-semibold text-emerald-900 underline underline-offset-2">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </>
  )
}
