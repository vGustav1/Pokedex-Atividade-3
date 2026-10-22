import { useState, useEffect, useCallback } from 'react'
import {
  getStoredFavorites,
  isFavorite,
  toggleFavorite,
} from '../utils/favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => getStoredFavorites())

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(getStoredFavorites())
    }

    window.addEventListener('storage', syncFavorites)
    window.addEventListener('pokedex_favorites_changed', syncFavorites)

    return () => {
      window.removeEventListener('storage', syncFavorites)
      window.removeEventListener('pokedex_favorites_changed', syncFavorites)
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

export { isFavorite, toggleFavorite, getStoredFavorites }
