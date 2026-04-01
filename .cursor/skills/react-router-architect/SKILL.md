---
name: react-router-architect
description: Specialized in designing routing systems, protected routes, and lazy loading with React Router v6.
---

# Routing configuration rules:

1. **Centralized structure**:
   - Prefer `createBrowserRouter` (Data APIs) instead of declaring `<Routes>` in JSX for better performance.
   - Define the route list in `src/routes/index.tsx`.

2. **Lazy loading & imports**:
   - Use `React.lazy()` (or `lazy(async () => import(...))`) for **route-level** page components.
   - **Dynamic imports must point at the page file** inside its folder, e.g.  
     `import('@/features/Admin/components/AdminUsersPage/AdminUsersPage')`  
     not the folder alone.
   - Wrap lazy trees in `<Suspense fallback={...}>`.

3. **Route protection (Auth Guard)**:
   - Create a `ProtectedRoute` component to check authentication state (token/user) from Redux.
   - If not logged in, use `<Navigate to="/login" replace />`.

4. **Nested routes**:
   - Use `<Outlet />` in layout components (such as `MainLayout`, `AdminLayout`) to render child content.

5. **Navigation**:
   - Use the `useNavigate()` hook for navigation logic in code.
   - Use `<NavLink>` for menus so the `active` class is applied automatically.

**Example request**: "Create a routing structure with a Public page (Home) and a Private page (Dashboard) that requires login."