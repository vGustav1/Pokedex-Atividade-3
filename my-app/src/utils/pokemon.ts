import type { Pokemon, SortOption } from '../types/pokemon'

export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`
}

export function getPokemonArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function normalizeSearchTerm(term: string): string {
  return term.trim().toLowerCase().replace(/^#/, '')
}

export function getPokemonTotalStats(stats: Pokemon['stats']): number {
  return (
    stats.hp +
    stats.attack +
    stats.defense +
    stats.specialAttack +
    stats.specialDefense +
    stats.speed
  )
}

export const MAX_POKEMON_STAT_VALUE = 255

export interface StatDefinition {
  key: keyof Pokemon['stats']
  label: string
  color: string
}

export const POKEMON_STATS_DEFINITIONS: StatDefinition[] = [
  { key: 'hp', label: 'HP', color: 'bg-emerald-500' },
  { key: 'attack', label: 'Ataque', color: 'bg-orange-500' },
  { key: 'defense', label: 'Defesa', color: 'bg-amber-500' },
  { key: 'specialAttack', label: 'Ataque Especial', color: 'bg-blue-500' },
  { key: 'specialDefense', label: 'Defesa Especial', color: 'bg-indigo-500' },
  { key: 'speed', label: 'Velocidade', color: 'bg-rose-500' },
]

export function sortPokemon(list: Pokemon[], sortBy: SortOption): Pokemon[] {
  const sorted = [...list]

  switch (sortBy) {
    case 'id-asc':
      return sorted.sort((a, b) => a.id - b.id)
    case 'id-desc':
      return sorted.sort((a, b) => b.id - a.id)
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'hp-desc':
      return sorted.sort((a, b) => b.stats.hp - a.stats.hp || a.id - b.id)
    case 'attack-desc':
      return sorted.sort((a, b) => b.stats.attack - a.stats.attack || a.id - b.id)
    default:
      return sorted
  }
}

export const TYPE_STYLES: Record<string, string> = {
  normal: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  fire: 'bg-orange-50 text-orange-700 border-orange-200',
  water: 'bg-sky-50 text-sky-700 border-sky-200',
  grass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  electric: 'bg-amber-50 text-amber-700 border-amber-200',
  ice: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  fighting: 'bg-red-50 text-red-700 border-red-200',
  poison: 'bg-purple-50 text-purple-700 border-purple-200',
  ground: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  flying: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  psychic: 'bg-pink-50 text-pink-700 border-pink-200',
  bug: 'bg-lime-50 text-lime-800 border-lime-200',
  rock: 'bg-stone-100 text-stone-700 border-stone-200',
  ghost: 'bg-violet-50 text-violet-700 border-violet-200',
  dragon: 'bg-blue-50 text-blue-800 border-blue-200',
  steel: 'bg-slate-100 text-slate-700 border-slate-200',
  fairy: 'bg-rose-50 text-rose-700 border-rose-200',
  dark: 'bg-zinc-100 text-zinc-800 border-zinc-300',
}

export const DEFAULT_TYPE_STYLE = 'bg-slate-100 text-slate-700 border-slate-200'

export function getTypeBadgeStyle(typeName: string): string {
  return TYPE_STYLES[typeName.toLowerCase()] ?? DEFAULT_TYPE_STYLE
}

export const ALL_POKEMON_TYPES = [
  { id: 'Normal', label: 'Normal' },
  { id: 'Fire', label: 'Fogo' },
  { id: 'Water', label: 'Água' },
  { id: 'Grass', label: 'Planta' },
  { id: 'Electric', label: 'Elétrico' },
  { id: 'Ice', label: 'Gelo' },
  { id: 'Fighting', label: 'Lutador' },
  { id: 'Poison', label: 'Veneno' },
  { id: 'Ground', label: 'Terra' },
  { id: 'Flying', label: 'Voador' },
  { id: 'Psychic', label: 'Psíquico' },
  { id: 'Bug', label: 'Inseto' },
  { id: 'Rock', label: 'Pedra' },
  { id: 'Ghost', label: 'Fantasma' },
  { id: 'Dragon', label: 'Dragão' },
  { id: 'Steel', label: 'Aço' },
  { id: 'Fairy', label: 'Fada' },
  { id: 'Dark', label: 'Sombrio' },
] as const
