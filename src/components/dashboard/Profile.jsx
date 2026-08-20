import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Profile() {
  const { owner, updateProfile } = useAuth()
  const [form, setForm] = useState({
    name: owner.name || '',
    email: owner.email || '',
    phone: owner.phone || '',
    currentPassword: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [saving, setSaving] = useState(false)

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const payload = { name: form.name, email: form.email, phone: form.phone }
      if (form.password) {
        payload.password = form.password
        payload.currentPassword = form.currentPassword
      }
      await updateProfile(payload)
      setSuccess('Your profile has been updated.')
      setForm({ ...form, currentPassword: '', password: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="max-w-xl space-y-4 rounded-2xl border border-gold-500/20 bg-cream-light p-6">
      <h3 className="font-display text-lg text-emerald-950">Personal Information</h3>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {success && <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{success}</p>}

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">Name</label>
        <input
          required
          value={form.name}
          onChange={change('name')}
          className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={change('email')}
            className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={change('phone')}
            className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="border-t border-gold-500/15 pt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-900">
          Change Password (optional)
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
              Current Password
            </label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={change('currentPassword')}
              className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900">
              New Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={change('password')}
              className="w-full rounded-lg border border-emerald-900/20 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-full bg-emerald-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream shadow-gold transition hover:bg-emerald-800 disabled:opacity-60"
      >
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  )
}
