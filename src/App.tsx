import type { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/routes'

interface AppProps {
  _?: never
}

export const App: FC<AppProps> = () => {
  return <RouterProvider router={router} />
}

export default App
