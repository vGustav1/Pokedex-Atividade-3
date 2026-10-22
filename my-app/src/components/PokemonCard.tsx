import type { Pokemon } from '../types/pokemon'
import { formatPokemonId, getPokemonArtworkUrl } from '../utils/pokemon'
import { cn } from '../lib/utils'

interface PokemonCardProps {
  pokemon: Pokemon
  className?: string
}

export function PokemonCard({ pokemon, className }: PokemonCardProps) {
  return (
    <article className={cn('pokemon-card', className)}>
      <img
        className="pokemon-image"
        src={getPokemonArtworkUrl(pokemon.id)}
        alt={pokemon.name}
        loading="lazy"
      />
      <div className="pokemon-info">
        <span className="pokemon-number">
          {formatPokemonId(pokemon.id)}
        </span>
        <h2>{pokemon.name}</h2>
        <div className="type-list">
          {pokemon.types.map((type) => (
            <span
              key={type.id}
              className={`type type-${type.name.toLowerCase()}`}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
