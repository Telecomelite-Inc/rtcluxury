import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { apiFetch } from '../lib/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [owner, setOwner] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const data = await apiFetch('/me')
      setOwner(data.owner)
    } catch {
      setOwner(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const signup = async (form) => {
    const data = await apiFetch('/signup', { method: 'POST', body: form })
    setOwner(data.owner)
    return data.owner
  }

  const login = async (form) => {
    const data = await apiFetch('/login', { method: 'POST', body: form })
    setOwner(data.owner)
    return data.owner
  }

  const logout = async () => {
    await apiFetch('/logout', { method: 'POST' })
    setOwner(null)
  }

  const updateProfile = async (form) => {
    const data = await apiFetch('/me', { method: 'PUT', body: form })
    setOwner(data.owner)
    return data.owner
  }

  const value = { owner, loading, signup, login, logout, updateProfile, refresh }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
