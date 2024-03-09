import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Decks } from './pages/decks/decks'

const publicRoutes: RouteObject[] = [
  {
    element: <div>hello</div>,
    path: '/',
  },
  {
    element: <Decks />,
    path: '/decks',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/login',
  },
]

const PrivateRoutes = () => {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}
