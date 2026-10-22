const FAVORITES_STORAGE_KEY = 'pokedex_favorites'
const FAVORITES_EVENT = 'pokedex_favorites_changed'

export function getStoredFavorites(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is number => typeof id === 'number')
    }
  } catch {
    return []
  }
  return []
}

export function setStoredFavorites(favorites: number[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: favorites }))
  } catch {
    // Falha silenciosa em ambientes com armazenamento restrito
  }
}

export function isFavorite(id: number, favorites?: number[]): boolean {
  if (favorites) {
    return favorites.includes(id)
  }
  return getStoredFavorites().includes(id)
}

export function toggleFavorite(id: number): number[] {
  const current = getStoredFavorites()
  const exists = current.includes(id)
  const updated = exists ? current.filter((favId) => favId !== id) : [...current, id]
  setStoredFavorites(updated)
  return updated
}
