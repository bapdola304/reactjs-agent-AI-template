import { useContext } from 'react'

import { ThemeContext } from '@/theme/themeContext'
import type { ThemeContextValue } from '@/theme/themeContext'

export const useThemeMode = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeProvider')
  }
  return ctx
}

