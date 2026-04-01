import type { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  _?: never
}

export const ProtectedRoute: FC<ProtectedRouteProps> = () => {
  const location = useLocation()
  const authToken = localStorage.getItem('auth_token')

  if (!authToken) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return <Outlet />
}

