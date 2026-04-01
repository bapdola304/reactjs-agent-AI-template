import type { FC, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'

import { ThemeContext } from '@/theme/themeContext'
import type { ThemeContextValue } from '@/theme/themeContext'
import type { ThemeMode } from '@/theme/themeMode'
import { getInitialThemeMode, persistThemeMode } from '@/theme/themeMode'

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialThemeMode)

  useEffect(() => {
    persistThemeMode(mode)
  }, [mode])

  const setModeAndPersist = useCallback((nextMode: ThemeMode) => {
    setMode(nextMode)
  }, [])

  const toggleMode = useCallback(() => {
    setModeAndPersist(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setModeAndPersist])

  const themeConfig = useMemo(() => {
    return {
      algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      cssVar: { prefix: 'ant' },
    }
  }, [mode])

  const value = useMemo<ThemeContextValue>(() => {
    return { mode, setMode: setModeAndPersist, toggleMode }
  }, [mode, setModeAndPersist, toggleMode])

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  )
}

