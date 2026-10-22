import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

const THEME_KEY = 'pokedex_theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY)
      if (stored === 'dark' || stored === 'light') {
        return stored
      }
    } catch {
      // Falha silenciosa de localStorage
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      root.style.colorScheme = 'light'
    }

    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // Falha silenciosa de localStorage
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}
