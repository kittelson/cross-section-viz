import type { RouteObject } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { FormPage } from '@/pages/FormPage'
import { HomePage } from '@/pages/HomePage'

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/form', element: <FormPage /> },
    ],
  },
]
