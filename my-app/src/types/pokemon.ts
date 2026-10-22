import type pokedexData from '../data/pokedex-data.json'

export type Pokemon = (typeof pokedexData.pokemon)[number]
export type PokemonType = Pokemon['types'][number]
