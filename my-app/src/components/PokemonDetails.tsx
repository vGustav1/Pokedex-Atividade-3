import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart, ArrowLeftRight } from 'lucide-react'
import type { Pokemon } from '../types/pokemon'
import {
  formatPokemonId,
  getPokemonArtworkUrl,
  getTypeBadgeStyle,
  getPokemonTotalStats,
  POKEMON_STATS_DEFINITIONS,
  MAX_POKEMON_STAT_VALUE,
} from '../utils/pokemon'
import { cn } from '../lib/utils'

export interface PokemonDetailsProps {
  pokemon: Pokemon
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
  isFavorite?: boolean
  onToggleFavorite?: () => void
  onCompare?: (pokemon: Pokemon) => void
}

export function PokemonDetails({
  pokemon,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  isFavorite = false,
  onToggleFavorite,
  onCompare,
}: PokemonDetailsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious()
      } else if (event.key === 'ArrowRight' && hasNext && onNext) {
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext])

  const totalStats = getPokemonTotalStats(pokemon.stats)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-details-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-2xl bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-3.5 bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!hasPrevious}
              aria-label="Pokémon anterior"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-200"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              aria-label="Próximo Pokémon"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-slate-200"
            >
              <span>Próximo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {onCompare && (
              <button
                type="button"
                onClick={() => onCompare(pokemon)}
                aria-label="Comparar Pokémon"
                title="Comparar este Pokémon"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Comparar</span>
              </button>
            )}

            {onToggleFavorite && (
              <button
                type="button"
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <Heart
                  className={cn(
                    'w-5 h-5 transition-transform duration-150 active:scale-90',
                    isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                  )}
                />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="flex flex-col items-center text-center">
              <div className="relative flex aspect-square w-full max-w-[240px] items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 p-6">
                <span className="absolute top-3 left-3 font-mono text-xs font-semibold text-slate-400 tracking-wider">
                  {formatPokemonId(pokemon.id)}
                </span>
                <motion.img
                  key={pokemon.id}
                  src={getPokemonArtworkUrl(pokemon.id)}
                  alt={pokemon.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="h-full w-full object-contain drop-shadow-md select-none"
                />
              </div>

              <h2
                id="pokemon-details-title"
                className="mt-4 text-2xl font-bold tracking-tight text-slate-900 capitalize"
              >
                {pokemon.name}
              </h2>

              <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                {pokemon.types.map((type) => (
                  <span
                    key={type.id}
                    className={cn(
                      'rounded-md border px-2.5 py-1 text-xs font-medium leading-none',
                      getTypeBadgeStyle(type.name)
                    )}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                  Atributos Base
                </h3>
                <span className="text-[11px] font-medium text-slate-400">
                  Máx. {MAX_POKEMON_STAT_VALUE}
                </span>
              </div>

              <div className="space-y-3">
                {POKEMON_STATS_DEFINITIONS.map((stat) => {
                  const value = pokemon.stats[stat.key]
                  const percentage = Math.min(100, Math.round((value / MAX_POKEMON_STAT_VALUE) * 100))
                  return (
                    <div
                      key={stat.key}
                      className="grid grid-cols-[115px_36px_1fr] items-center gap-2.5"
                    >
                      <span className="text-xs font-medium text-slate-500 truncate">
                        {stat.label}
                      </span>
                      <span className="text-xs font-semibold font-mono text-slate-800 text-right">
                        {value}
                      </span>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          key={`${pokemon.id}-${stat.key}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className={cn('h-full rounded-full', stat.color)}
                        />
                      </div>
                    </div>
                  )
                })}

                <div className="pt-3 mt-3 border-t border-slate-100 grid grid-cols-[115px_36px_1fr] items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Total
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-900 text-right">
                    {totalStats}
                  </span>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      key={`${pokemon.id}-total`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.round((totalStats / 720) * 100))}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="h-full rounded-full bg-slate-800"
                    />
                  </div>
                </div>

                {onCompare && (
                  <div className="pt-3 mt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onCompare(pokemon)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                      <span>Comparar este Pokémon</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
