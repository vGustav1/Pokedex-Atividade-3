import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Award, Search, Users } from 'lucide-react'
import pokedexData from '../data/pokedex-data.json'
import type { Pokemon, Trainer } from '../types/pokemon'
import {
  formatPokemonId,
  getPokemonArtworkUrl,
  TYPE_STYLES,
  DEFAULT_TYPE_STYLE,
} from '../utils/pokemon'
import { cn } from '../lib/utils'

export interface TrainersModalProps {
  onClose: () => void
  onSelectPokemon: (pokemon: Pokemon) => void
}

export function TrainersModal({ onClose, onSelectPokemon }: TrainersModalProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const trainers: Trainer[] = pokedexData.trainers
  const allPokemon: Pokemon[] = pokedexData.pokemon

  const pokemonMap = useMemo(() => {
    return new Map<number, Pokemon>(allPokemon.map((p) => [p.id, p]))
  }, [allPokemon])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [onClose])

  const filteredTrainers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return trainers

    return trainers.filter((trainer) => {
      const matchesTrainerName = trainer.name.toLowerCase().includes(term)
      const matchesPokemon = trainer.pokemonIds.some((id) => {
        const p = pokemonMap.get(id)
        return (
          p &&
          (p.name.toLowerCase().includes(term) ||
            String(p.id) === term ||
            p.types.some((t) => t.name.toLowerCase().includes(term)))
        )
      })

      return matchesTrainerName || matchesPokemon
    })
  }, [trainers, pokemonMap, searchTerm])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trainers-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 id="trainers-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
                Treinadores & Insígnias
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Conheça os treinadores e suas equipes oficiais
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="px-5 sm:px-6 py-3 border-b border-slate-100 bg-slate-50/60 shrink-0">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar treinador ou Pokémon da equipe..."
              className="w-full bg-white text-xs sm:text-sm pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                title="Limpar filtro"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <article
                key={trainer.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 uppercase tracking-wider">
                      {trainer.name.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        {trainer.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {trainer.pokemonIds.length}{' '}
                        {trainer.pokemonIds.length === 1 ? 'Pokémon' : 'Pokémon na equipe'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border',
                        trainer.badges > 0
                          ? 'bg-amber-50 text-amber-800 border-amber-200/90'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      )}
                    >
                      <Award
                        className={cn(
                          'w-3.5 h-3.5 shrink-0',
                          trainer.badges > 0 ? 'text-amber-600' : 'text-slate-400'
                        )}
                      />
                      <span>
                        {trainer.badges > 0
                          ? `${trainer.badges} ${trainer.badges === 1 ? 'insígnia' : 'insígnias'}`
                          : 'Sem insígnias'}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-2.5">
                  {trainer.pokemonIds.map((pokemonId, idx) => {
                    const pokemon = pokemonMap.get(pokemonId)
                    if (!pokemon) return null

                    return (
                      <button
                        key={`${trainer.id}-${pokemonId}-${idx}`}
                        type="button"
                        onClick={() => onSelectPokemon(pokemon)}
                        aria-label={`Ver detalhes de ${pokemon.name}`}
                        className="group relative flex flex-col items-center p-2.5 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer text-center"
                      >
                        <span className="font-mono text-[10px] text-slate-400 font-medium mb-1">
                          {formatPokemonId(pokemon.id)}
                        </span>

                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center my-0.5">
                          <img
                            src={getPokemonArtworkUrl(pokemon.id)}
                            alt={pokemon.name}
                            loading="lazy"
                            className="w-full h-full object-contain drop-shadow-xs group-hover:scale-110 transition-transform duration-200"
                          />
                        </div>

                        <span className="text-xs font-semibold text-slate-800 capitalize truncate w-full mt-1">
                          {pokemon.name}
                        </span>

                        <div className="mt-1 flex flex-wrap justify-center gap-1 w-full">
                          {pokemon.types.map((type) => (
                            <span
                              key={type.id}
                              className={cn(
                                'rounded px-1.5 py-0.2 text-[9px] font-medium border leading-normal truncate',
                                TYPE_STYLES[type.name.toLowerCase()] ?? DEFAULT_TYPE_STYLE
                              )}
                            >
                              {type.name}
                            </span>
                          ))}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12 px-4">
              <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Nenhum treinador encontrado</p>
              <p className="text-xs text-slate-500 mt-1">
                Tente buscar por outro termo ou nome de Pokémon.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
