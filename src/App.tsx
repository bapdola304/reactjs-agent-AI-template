import type { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/routes'
import { ThemeProvider } from '@/theme/ThemeProvider'

interface AppProps {
  _?: never
}

export const App: FC<AppProps> = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
