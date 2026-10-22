import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Sparkles, Award, Swords } from 'lucide-react'
import { cn } from '../lib/utils'
import { Filters, type FiltersProps } from './Filters'

export interface AppleSpotlightProps extends FiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onRandomSelect?: () => void
  onOpenTrainers?: () => void
  onOpenCompare?: () => void
}

export function AppleSpotlight({
  searchTerm,
  onSearchChange,
  onRandomSelect,
  onOpenTrainers,
  onOpenCompare,
  selectedType,
  onTypeSelect,
  onlyFavorites,
  onToggleFavorites,
  favoritesCount,
  sortBy,
  onSortChange,
  totalCount,
  resultCount,
}: AppleSpotlightProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mb-8">
      <motion.div
        layout
        className={cn(
          'relative rounded-2xl transition-all duration-300',
          'bg-white/95 backdrop-blur-xl',
          'border border-slate-200/90 shadow-md shadow-slate-200/50',
          'hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60',
          isFocused && 'border-slate-400 ring-4 ring-slate-900/5 shadow-xl shadow-slate-300/40'
        )}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5">
          <Search
            className={cn(
              'w-5 h-5 shrink-0 transition-colors duration-200',
              isFocused ? 'text-slate-800' : 'text-slate-400'
            )}
            aria-hidden="true"
          />

          <div className="relative flex-1 min-w-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  onSearchChange('')
                }
              }}
              placeholder="Buscar Pokémon por nome ou nº (ex: Pikachu, 025)..."
              aria-label="Buscar Pokémon por nome ou número"
              autoComplete="off"
              spellCheck="false"
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base outline-none font-medium selection:bg-slate-200"
            />
          </div>

          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-400 hover:text-slate-700 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
              title="Limpar pesquisa (Esc)"
              aria-label="Limpar pesquisa"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}

          <div className="flex items-center gap-1.5 shrink-0">
            {onOpenTrainers && (
              <button
                type="button"
                onClick={onOpenTrainers}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 active:scale-95 text-xs font-semibold text-slate-700 border border-slate-200/70 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
                title="Ver Treinadores e suas equipes"
                aria-label="Ver Treinadores"
              >
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Treinadores</span>
              </button>
            )}

            {onOpenCompare && (
              <button
                type="button"
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 active:scale-95 text-xs font-semibold text-slate-700 border border-slate-200/70 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
                title="Comparar Pokémon"
                aria-label="Comparar Pokémon"
              >
                <Swords className="w-3.5 h-3.5 text-indigo-600 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Comparar</span>
              </button>
            )}

            {onRandomSelect && (
              <button
                type="button"
                onClick={onRandomSelect}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 active:scale-95 text-xs font-semibold text-slate-700 border border-slate-200/70 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
                title="Sortear um Pokémon aleatório"
                aria-label="Sortear Pokémon aleatório"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Aleatório</span>
              </button>
            )}
          </div>
        </div>

        <Filters
          selectedType={selectedType}
          onTypeSelect={onTypeSelect}
          onlyFavorites={onlyFavorites}
          onToggleFavorites={onToggleFavorites}
          favoritesCount={favoritesCount}
          sortBy={sortBy}
          onSortChange={onSortChange}
          totalCount={totalCount}
          resultCount={resultCount}
        />
      </motion.div>
    </div>
  )
}
