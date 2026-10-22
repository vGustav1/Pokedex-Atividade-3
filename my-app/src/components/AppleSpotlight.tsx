import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Sparkles, Award, Swords, Sun, Moon } from 'lucide-react'
import { cn } from '../lib/utils'
import { Filters, type FiltersProps } from './Filters'
import type { Theme } from '../hooks/useTheme'

export interface AppleSpotlightProps extends FiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onRandomSelect?: () => void
  onOpenTrainers?: () => void
  onOpenCompare?: () => void
  theme?: Theme
  onToggleTheme?: () => void
}

export function AppleSpotlight({
  searchTerm,
  onSearchChange,
  onRandomSelect,
  onOpenTrainers,
  onOpenCompare,
  theme = 'light',
  onToggleTheme,
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
          'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl',
          'border border-slate-200/90 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none',
          'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg',
          isFocused && 'border-slate-400 dark:border-slate-600 ring-4 ring-slate-900/5 dark:ring-slate-100/5'
        )}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5">
          <Search
            className={cn(
              'w-5 h-5 shrink-0 transition-colors duration-200',
              isFocused ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'
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
              placeholder="Pesquisar..."
              aria-label="Buscar Pokémon por nome ou número"
              autoComplete="off"
              spellCheck="false"
              className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base outline-none font-medium selection:bg-slate-200 dark:selection:bg-slate-700"
            />
          </div>

          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
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
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 active:scale-95 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
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
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 active:scale-95 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
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
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 active:scale-95 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
                title="Sortear um Pokémon aleatório"
                aria-label="Sortear Pokémon aleatório"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Aleatório</span>
              </button>
            )}

            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 active:scale-90 text-slate-700 dark:text-amber-400 border border-slate-200/70 dark:border-slate-700 transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
                title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
                aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 transition-transform duration-200 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 transition-transform duration-200 hover:-rotate-12" />
                )}
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
