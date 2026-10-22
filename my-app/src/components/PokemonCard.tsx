import type { Pokemon } from '../types/pokemon'
import { formatPokemonId, getPokemonArtworkUrl } from '../utils/pokemon'
import { cn } from '../lib/utils'

export interface PokemonCardProps {
  pokemon: Pokemon
  className?: string
  onClick?: () => void
}

const TYPE_STYLES: Record<string, string> = {
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
}

const DEFAULT_TYPE_STYLE = 'bg-slate-100 text-slate-700 border-slate-200'

export function PokemonCard({ pokemon, className, onClick }: PokemonCardProps) {
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
                  TYPE_STYLES[type.name.toLowerCase()] ?? DEFAULT_TYPE_STYLE
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
