import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Sparkles, Flame, Droplets, Leaf, Zap } from 'lucide-react'
import { cn } from '../lib/utils'

interface QuickFilter {
  id: string
  label: string
  icon: typeof Flame
  color: string
}

const QUICK_FILTERS: QuickFilter[] = [
  { id: 'Fire', label: 'Fogo', icon: Flame, color: 'text-amber-500 hover:bg-amber-500/10' },
  { id: 'Water', label: 'Água', icon: Droplets, color: 'text-blue-500 hover:bg-blue-500/10' },
  { id: 'Grass', label: 'Planta', icon: Leaf, color: 'text-emerald-500 hover:bg-emerald-500/10' },
  { id: 'Electric', label: 'Elétrico', icon: Zap, color: 'text-yellow-500 hover:bg-yellow-500/10' },
]

interface AppleSpotlightProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedType: string | null
  onTypeSelect: (type: string | null) => void
  onRandomSelect?: () => void
  totalCount: number
  resultCount: number
}

export function AppleSpotlight({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeSelect,
  onRandomSelect,
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
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
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

        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-t border-slate-200/60 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <button
              type="button"
              onClick={() => onTypeSelect(null)}
              className={cn(
                'px-2.5 py-1 rounded-lg font-semibold transition',
                selectedType === null
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              )}
            >
              Todos
            </button>

            {QUICK_FILTERS.map((filter) => {
              const Icon = filter.icon
              const isSelected = selectedType === filter.id

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => onTypeSelect(isSelected ? null : filter.id)}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition',
                    filter.color,
                    isSelected && 'bg-slate-900 text-white shadow-sm'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{filter.label}</span>
                </button>
              )
            })}
          </div>

          <span className="text-slate-500 shrink-0">
            {resultCount === totalCount
              ? `${totalCount} Pokémon`
              : `${resultCount} de ${totalCount}`}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
