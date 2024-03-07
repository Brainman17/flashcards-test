import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useGetDecksQuery } from './services/base-api'

const publicRoutes: RouteObject[] = [
  {
    element: <div>hello</div>,
    path: '/',
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
  const { data, isLoading } = useGetDecksQuery()

  if (isLoading) {
    return <div>...Loading</div>
  }

  console.log(data)

  return <RouterProvider router={router} />
}
