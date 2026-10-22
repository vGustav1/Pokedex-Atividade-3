import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeftRight, Search, Shuffle, Trophy, Scale } from 'lucide-react'
import type { Pokemon } from '../types/pokemon'
import {
  formatPokemonId,
  getPokemonArtworkUrl,
  getTypeBadgeStyle,
  getPokemonTotalStats,
  normalizeSearchTerm,
  POKEMON_STATS_DEFINITIONS,
  MAX_POKEMON_STAT_VALUE,
} from '../utils/pokemon'
import { cn } from '../lib/utils'

export interface PokemonCompareProps {
  pokemon1: Pokemon
  pokemon2: Pokemon
  allPokemon: Pokemon[]
  onClose: () => void
  onSelectPokemon1: (pokemon: Pokemon) => void
  onSelectPokemon2: (pokemon: Pokemon) => void
  onSwap?: () => void
}

const PRESET_DUELS = [
  { label: 'Bulbasaur vs Charmander', id1: 1, id2: 4 },
  { label: 'Charizard vs Blastoise', id1: 6, id2: 9 },
  { label: 'Pikachu vs Raichu', id1: 25, id2: 26 },
  { label: 'Gengar vs Alakazam', id1: 94, id2: 65 },
  { label: 'Mewtwo vs Mew', id1: 150, id2: 151 },
]

export function PokemonCompare({
  pokemon1,
  pokemon2,
  allPokemon,
  onClose,
  onSelectPokemon1,
  onSelectPokemon2,
  onSwap,
}: PokemonCompareProps) {
  const [activeSlot, setActiveSlot] = useState<1 | 2 | null>(null)
  const [selectorSearch, setSelectorSearch] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (activeSlot !== null) {
          setActiveSlot(null)
          setSelectorSearch('')
        } else {
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [activeSlot, onClose])

  const filteredSelectorList = useMemo(() => {
    const term = normalizeSearchTerm(selectorSearch)
    if (!term) return allPokemon

    return allPokemon.filter(
      (p) => p.name.toLowerCase().includes(term) || String(p.id).includes(term)
    )
  }, [allPokemon, selectorSearch])

  const totalStats1 = getPokemonTotalStats(pokemon1.stats)
  const totalStats2 = getPokemonTotalStats(pokemon2.stats)

  let wins1 = 0
  let wins2 = 0
  for (const stat of POKEMON_STATS_DEFINITIONS) {
    const val1 = pokemon1.stats[stat.key]
    const val2 = pokemon2.stats[stat.key]
    if (val1 > val2) wins1++
    else if (val2 > val1) wins2++
  }

  const handleRandomize = (slot: 1 | 2) => {
    const avoidId = slot === 1 ? pokemon2.id : pokemon1.id
    const candidates = allPokemon.filter((p) => p.id !== avoidId)
    const random = candidates[Math.floor(Math.random() * candidates.length)]

    if (slot === 1) {
      onSelectPokemon1(random)
    } else {
      onSelectPokemon2(random)
    }
  }

  const handleSelectPreset = (id1: number, id2: number) => {
    const p1 = allPokemon.find((p) => p.id === id1)
    const p2 = allPokemon.find((p) => p.id === id2)
    if (p1 && p2) {
      onSelectPokemon1(p1)
      onSelectPokemon2(p2)
    }
  }

  const handleSelectFromList = (p: Pokemon) => {
    if (activeSlot === 1) {
      onSelectPokemon1(p)
    } else if (activeSlot === 2) {
      onSelectPokemon2(p)
    }
    setActiveSlot(null)
    setSelectorSearch('')
  }

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
      aria-labelledby="pokemon-compare-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-3xl bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-6 py-4 bg-white shrink-0">
          <div>
            <h2 id="pokemon-compare-title" className="text-base sm:text-lg font-bold text-slate-900">
              Comparador de Atributos
            </h2>
            <p className="text-xs text-slate-500">
              Compare as estatísticas base entre dois Pokémon lado a lado
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar comparador"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-medium shrink-0 mr-1">Sugestões:</span>
            {PRESET_DUELS.map((preset) => {
              const isSelected =
                (pokemon1.id === preset.id1 && pokemon2.id === preset.id2) ||
                (pokemon1.id === preset.id2 && pokemon2.id === preset.id1)

              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id1, preset.id2)}
                  className={cn(
                    'px-2.5 py-1 rounded-full font-medium transition shrink-0 border',
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  )}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-100 relative">
              <span className="font-mono text-[11px] font-semibold text-slate-400">
                {formatPokemonId(pokemon1.id)}
              </span>

              <div className="relative aspect-square w-24 sm:w-32 my-1.5 flex items-center justify-center">
                <img
                  src={getPokemonArtworkUrl(pokemon1.id)}
                  alt={pokemon1.name}
                  className="h-full w-full object-contain drop-shadow-md select-none"
                />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 capitalize truncate max-w-full">
                {pokemon1.name}
              </h3>

              <div className="mt-1 flex flex-wrap justify-center gap-1">
                {pokemon1.types.map((type) => (
                  <span
                    key={type.id}
                    className={cn(
                      'rounded-md border px-1.5 py-0.5 text-[10px] font-medium leading-none',
                      getTypeBadgeStyle(type.name)
                    )}
                  >
                    {type.name}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSlot(1)
                    setSelectorSearch('')
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>Trocar</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRandomize(1)}
                  title="Sortear outro Pokémon"
                  className="p-1.5 rounded-lg text-slate-500 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition"
                >
                  <Shuffle className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                VS
              </div>
              {onSwap && (
                <button
                  type="button"
                  onClick={onSwap}
                  title="Inverter lados"
                  aria-label="Inverter lados dos Pokémon"
                  className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs transition"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-100 relative">
              <span className="font-mono text-[11px] font-semibold text-slate-400">
                {formatPokemonId(pokemon2.id)}
              </span>

              <div className="relative aspect-square w-24 sm:w-32 my-1.5 flex items-center justify-center">
                <img
                  src={getPokemonArtworkUrl(pokemon2.id)}
                  alt={pokemon2.name}
                  className="h-full w-full object-contain drop-shadow-md select-none"
                />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 capitalize truncate max-w-full">
                {pokemon2.name}
              </h3>

              <div className="mt-1 flex flex-wrap justify-center gap-1">
                {pokemon2.types.map((type) => (
                  <span
                    key={type.id}
                    className={cn(
                      'rounded-md border px-1.5 py-0.5 text-[10px] font-medium leading-none',
                      getTypeBadgeStyle(type.name)
                    )}
                  >
                    {type.name}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSlot(2)
                    setSelectorSearch('')
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>Trocar</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRandomize(2)}
                  title="Sortear outro Pokémon"
                  className="p-1.5 rounded-lg text-slate-500 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition"
                >
                  <Shuffle className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl border text-xs',
              wins1 > wins2
                ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
                : wins2 > wins1
                ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            )}
          >
            <div className="flex items-center gap-2">
              {wins1 !== wins2 ? (
                <Trophy className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <Scale className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span className="font-semibold">
                {wins1 > wins2
                  ? `${pokemon1.name} tem vantagem em ${wins1} de 6 atributos`
                  : wins2 > wins1
                  ? `${pokemon2.name} tem vantagem em ${wins2} de 6 atributos`
                  : `Empate técnico: cada Pokémon lidera em ${wins1} atributos`}
              </span>
            </div>

            <div className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 shadow-2xs">
              Pontuação Total: {totalStats1} vs {totalStats2}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="w-1/3 truncate text-left text-slate-700">{pokemon1.name}</span>
              <span className="w-1/3 text-center">Atributo</span>
              <span className="w-1/3 truncate text-right text-slate-700">{pokemon2.name}</span>
            </div>

            <div className="space-y-3.5">
              {POKEMON_STATS_DEFINITIONS.map((stat) => {
                const val1 = pokemon1.stats[stat.key]
                const val2 = pokemon2.stats[stat.key]
                const diff = val1 - val2
                const winner = diff > 0 ? 1 : diff < 0 ? 2 : 0
                const percent1 = Math.min(100, Math.round((val1 / MAX_POKEMON_STAT_VALUE) * 100))
                const percent2 = Math.min(100, Math.round((val2 / MAX_POKEMON_STAT_VALUE) * 100))

                return (
                  <div key={stat.key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 w-1/3 justify-start">
                        <span
                          className={cn(
                            'font-mono text-sm',
                            winner === 1 ? 'font-bold text-emerald-700' : 'font-medium text-slate-600'
                          )}
                        >
                          {val1}
                        </span>
                        {winner === 1 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.2 rounded-full">
                            +{diff}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center w-1/3 truncate px-1">
                        {stat.label}
                      </span>

                      <div className="flex items-center gap-1.5 w-1/3 justify-end">
                        {winner === 2 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.2 rounded-full">
                            +{Math.abs(diff)}
                          </span>
                        )}
                        <span
                          className={cn(
                            'font-mono text-sm',
                            winner === 2 ? 'font-bold text-emerald-700' : 'font-medium text-slate-600'
                          )}
                        >
                          {val2}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 items-center">
                      <div className="h-2 w-full bg-slate-100 rounded-full flex justify-end overflow-hidden">
                        <motion.div
                          key={`${pokemon1.id}-${stat.key}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percent1}%` }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className={cn(
                            'h-full rounded-full',
                            winner === 1 ? 'bg-emerald-500' : 'bg-slate-300'
                          )}
                        />
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full flex justify-start overflow-hidden">
                        <motion.div
                          key={`${pokemon2.id}-${stat.key}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percent2}%` }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className={cn(
                            'h-full rounded-full',
                            winner === 2 ? 'bg-emerald-500' : 'bg-slate-300'
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 w-1/3 justify-start">
                    <span
                      className={cn(
                        'font-mono text-base',
                        totalStats1 > totalStats2
                          ? 'font-bold text-slate-900'
                          : 'font-semibold text-slate-600'
                      )}
                    >
                      {totalStats1}
                    </span>
                    {totalStats1 > totalStats2 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.2 rounded-full">
                        +{totalStats1 - totalStats2}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider text-center w-1/3 truncate px-1">
                    Total Geral
                  </span>

                  <div className="flex items-center gap-1.5 w-1/3 justify-end">
                    {totalStats2 > totalStats1 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-1.5 py-0.2 rounded-full">
                        +{totalStats2 - totalStats1}
                      </span>
                    )}
                    <span
                      className={cn(
                        'font-mono text-base',
                        totalStats2 > totalStats1
                          ? 'font-bold text-slate-900'
                          : 'font-semibold text-slate-600'
                      )}
                    >
                      {totalStats2}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 items-center">
                  <div className="h-2.5 w-full bg-slate-100 rounded-full flex justify-end overflow-hidden">
                    <motion.div
                      key={`${pokemon1.id}-total`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.round((totalStats1 / 720) * 100))}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={cn(
                        'h-full rounded-full',
                        totalStats1 >= totalStats2 ? 'bg-slate-900' : 'bg-slate-300'
                      )}
                    />
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full flex justify-start overflow-hidden">
                    <motion.div
                      key={`${pokemon2.id}-total`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.round((totalStats2 / 720) * 100))}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={cn(
                        'h-full rounded-full',
                        totalStats2 >= totalStats1 ? 'bg-slate-900' : 'bg-slate-300'
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {activeSlot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md p-4 sm:p-6 flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Escolha o Pokémon {activeSlot === 1 ? '1' : '2'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Selecione qualquer Pokémon da lista para comparar
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSlot(null)
                    setSelectorSearch('')
                  }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative my-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  autoFocus
                  value={selectorSearch}
                  onChange={(e) => setSelectorSearch(e.target.value)}
                  placeholder="Pesquisar por nome ou número (#151)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400/30 focus:border-slate-400 transition"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {filteredSelectorList.map((pokemon) => {
                  const isCurrentlySelected =
                    (activeSlot === 1 && pokemon.id === pokemon1.id) ||
                    (activeSlot === 2 && pokemon.id === pokemon2.id)

                  return (
                    <button
                      key={pokemon.id}
                      type="button"
                      onClick={() => handleSelectFromList(pokemon)}
                      className={cn(
                        'w-full flex items-center justify-between p-2 rounded-xl text-left transition border',
                        isCurrentlySelected
                          ? 'bg-slate-100 border-slate-300 font-semibold text-slate-900'
                          : 'bg-white hover:bg-slate-50 border-transparent text-slate-700'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={getPokemonArtworkUrl(pokemon.id)}
                          alt={pokemon.name}
                          loading="lazy"
                          className="w-10 h-10 object-contain drop-shadow-xs"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs text-slate-400">
                              {formatPokemonId(pokemon.id)}
                            </span>
                            <span className="text-sm font-medium capitalize text-slate-900">
                              {pokemon.name}
                            </span>
                          </div>
                          <div className="flex gap-1 mt-0.5">
                            {pokemon.types.map((t) => (
                              <span
                                key={t.id}
                                className={cn(
                                  'text-[10px] px-1.5 py-0.2 rounded border font-medium',
                                  getTypeBadgeStyle(t.name)
                                )}
                              >
                                {t.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {isCurrentlySelected && (
                        <span className="text-xs font-semibold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded-md">
                          Atual
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
