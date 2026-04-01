export type ThemeMode = 'light' | 'dark'

const THEME_MODE_STORAGE_KEY = 'theme_mode'

export const getInitialThemeMode = (): ThemeMode => {
  const raw = localStorage.getItem(THEME_MODE_STORAGE_KEY)
  if (raw === 'light' || raw === 'dark') return raw

  const prefersDark =
    typeof window !== 'undefined' &&
    typeof window.matchMedia !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches

  return prefersDark ? 'dark' : 'light'
}

export const persistThemeMode = (mode: ThemeMode): void => {
  localStorage.setItem(THEME_MODE_STORAGE_KEY, mode)
}

