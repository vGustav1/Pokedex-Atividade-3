import type pokedexData from '../data/pokedex-data.json'

export type Pokemon = (typeof pokedexData.pokemon)[number]
export type PokemonType = Pokemon['types'][number]
export type Trainer = (typeof pokedexData.trainers)[number]

export type SortOption = 'id-asc' | 'id-desc' | 'name-asc' | 'hp-desc' | 'attack-desc'

