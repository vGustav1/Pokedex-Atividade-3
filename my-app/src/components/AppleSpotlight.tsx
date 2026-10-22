import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'
import { Filters, type FiltersProps } from './Filters'

export interface AppleSpotlightProps extends FiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onRandomSelect?: () => void
}

export function AppleSpotlight({
  searchTerm,
  onSearchChange,
  onRandomSelect,
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
          'bg-transparent backdrop-blur-md',
          'border border-slate-300/70 shadow-sm',
          isFocused && 'ring-2 ring-slate-400/40 border-slate-400'
        )}
      >
        <div className="flex items-center gap-3 px-4 py-3 sm:py-3.5">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />

          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Pesquisar..."
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base sm:text-lg outline-none font-medium"
            />
          </div>

          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              title="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {onRandomSelect && (
            <button
              type="button"
              onClick={onRandomSelect}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/50 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition shrink-0"
              title="Sortear um Pokémon aleatório"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden sm:inline">Aleatório</span>
            </button>
          )}
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
