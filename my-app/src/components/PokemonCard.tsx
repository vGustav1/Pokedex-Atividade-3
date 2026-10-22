import { Heart } from 'lucide-react'
import type { Pokemon } from '../types/pokemon'
import {
  formatPokemonId,
  getPokemonArtworkUrl,
  getTypeBadgeStyle,
} from '../utils/pokemon'
import { isFavorite as checkIsFavorite, toggleFavorite } from '../utils/favorites'
import { cn } from '../lib/utils'

export interface PokemonCardProps {
  pokemon: Pokemon
  className?: string
  onClick?: () => void
  isFavorite?: boolean
  onToggleFavorite?: (id: number) => void
}

export function PokemonCard({
  pokemon,
  className,
  onClick,
  isFavorite: isFavoriteProp,
  onToggleFavorite,
}: PokemonCardProps) {
  const isFav = isFavoriteProp !== undefined ? isFavoriteProp : checkIsFavorite(pokemon.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleFavorite) {
      onToggleFavorite(pokemon.id)
    } else {
      toggleFavorite(pokemon.id)
    }
  }

  return (
    <article
      onClick={onClick}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl',
        'bg-white cursor-pointer select-none',
        'border border-slate-200 hover:border-slate-300 transition-all duration-200',
        'p-4 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60',
        className
      )}
    >
      <div>
        <div className="relative flex aspect-square w-full items-center justify-center rounded-xl bg-slate-50 p-4 border border-slate-100">
          <span className="absolute top-2.5 left-2.5 font-mono text-[11px] font-medium text-slate-400 tracking-wider">
            {formatPokemonId(pokemon.id)}
          </span>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={isFav ? `Remover ${pokemon.name} dos favoritos` : `Adicionar ${pokemon.name} aos favoritos`}
            className={cn(
              'absolute top-2.5 right-2.5 z-10 flex items-center justify-center w-7 h-7 rounded-full',
              'transition-all duration-150',
              isFav
                ? 'text-rose-500 bg-rose-50 hover:bg-rose-100 shadow-xs'
                : 'text-slate-400 hover:text-rose-500 bg-white/90 hover:bg-white shadow-xs'
            )}
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-transform active:scale-75',
                isFav ? 'fill-rose-500 text-rose-500' : 'stroke-current'
              )}
            />
          </button>

          <img
            src={getPokemonArtworkUrl(pokemon.id)}
            alt={pokemon.name}
            loading="lazy"
            className="h-full w-full max-h-36 object-contain drop-shadow-sm transition-transform duration-200 ease-out group-hover:scale-105"
          />
        </div>

        <div className="mt-3">
          <h2 className="text-base font-semibold tracking-tight text-slate-900 capitalize">
            {pokemon.name}
          </h2>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {pokemon.types.map((type) => (
              <span
                key={type.id}
                className={cn(
                  'rounded-md border px-2 py-0.5 text-[11px] font-medium leading-none',
                  getTypeBadgeStyle(type.name)
                )}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-center">
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 truncate">
            HP
          </span>
          <span className="text-xs font-semibold text-slate-700">
            {pokemon.stats.hp}
          </span>
        </div>
        <div className="h-5 w-px bg-slate-200 shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 truncate">
            Ataque
          </span>
          <span className="text-xs font-semibold text-slate-700">
            {pokemon.stats.attack}
          </span>
        </div>
        <div className="h-5 w-px bg-slate-200 shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400 truncate">
            Velocidade
          </span>
          <span className="text-xs font-semibold text-slate-700">
            {pokemon.stats.speed}
          </span>
        </div>
      </div>
    </article>
  )
}
