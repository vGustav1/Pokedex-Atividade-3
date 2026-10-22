export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`
}

export function getPokemonArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}
