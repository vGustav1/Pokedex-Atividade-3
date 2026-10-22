import { useState, useEffect, useCallback } from 'react'
import {
  getStoredFavorites,
  toggleFavorite,
  FAVORITES_EVENT,
} from '../utils/favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => getStoredFavorites())

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(getStoredFavorites())
    }

    window.addEventListener('storage', syncFavorites)
    window.addEventListener(FAVORITES_EVENT, syncFavorites)

    return () => {
      window.removeEventListener('storage', syncFavorites)
      window.removeEventListener(FAVORITES_EVENT, syncFavorites)
    }
  }, [])

  const handleToggle = useCallback((id: number) => {
    const updated = toggleFavorite(id)
    setFavorites(updated)
  }, [])

  const checkFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  )

  return {
    favorites,
    isFavorite: checkFavorite,
    toggleFavorite: handleToggle,
  }
}
