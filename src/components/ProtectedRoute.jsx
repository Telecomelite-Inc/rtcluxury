import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { owner, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm uppercase tracking-wide text-emerald-950/50">Loading&hellip;</p>
      </div>
    )
  }

  if (!owner) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
