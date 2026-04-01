import { createElement, lazy, Suspense, type ReactNode } from 'react'
import { Flex, Spin } from 'antd'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '@/routes/ProtectedRoute'

const mainLayoutLazy = lazy(async () => {
  const module = await import('@/components/layouts/MainLayout/MainLayout')
  return { default: module.MainLayout }
})

const adminLayoutLazy = lazy(async () => {
  const module = await import('@/components/layouts/AdminLayout/AdminLayout')
  return { default: module.AdminLayout }
})

const loginPageLazy = lazy(async () => {
  const module = await import('@/features/Auth/components/LoginPage/LoginPage')
  return { default: module.LoginPage }
})

const adminDashboardPageLazy = lazy(async () => {
  const module = await import('@/features/Admin/components/AdminDashboardPage/AdminDashboardPage')
  return { default: module.AdminDashboardPage }
})

const adminUsersPageLazy = lazy(async () => {
  const module = await import('@/features/Admin/components/AdminUsersPage/AdminUsersPage')
  return { default: module.AdminUsersPage }
})

const adminAddUserPageLazy = lazy(async () => {
  const module = await import('@/features/Admin/components/AdminAddUserPage/AdminAddUserPage')
  return { default: module.AdminAddUserPage }
})

const adminSettingsPageLazy = lazy(async () => {
  const module = await import('@/features/Admin/components/AdminSettingsPage/AdminSettingsPage')
  return { default: module.AdminSettingsPage }
})

const loadingFallback = () => (
  <Flex align="center" justify="center" style={{ minHeight: '100vh' }}>
    <Spin size="large" />
  </Flex>
)

const withSuspense = (element: ReactNode) => {
  return <Suspense fallback={loadingFallback()}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: withSuspense(createElement(mainLayoutLazy)),
    children: [
      { index: true, element: <Navigate replace to="/login" /> },
      { path: '/login', element: withSuspense(createElement(loginPageLazy)) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: withSuspense(createElement(adminLayoutLazy)),
        children: [
          { index: true, element: <Navigate replace to="/admin/dashboard" /> },
          { path: 'dashboard', element: withSuspense(createElement(adminDashboardPageLazy)) },
          { path: 'users/new', element: withSuspense(createElement(adminAddUserPageLazy)) },
          { path: 'users', element: withSuspense(createElement(adminUsersPageLazy)) },
          { path: 'settings', element: withSuspense(createElement(adminSettingsPageLazy)) },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="/login" />,
  },
])

