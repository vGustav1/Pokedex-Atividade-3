import { ArrowUpDown, ChevronDown, Flame, Droplets, Leaf, Zap, Heart } from 'lucide-react'
import type { SortOption } from '../types/pokemon'
import { cn } from '../lib/utils'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'id-asc', label: 'Menor número (#1 -> #151)' },
  { value: 'id-desc', label: 'Maior número (#151 -> #1)' },
  { value: 'name-asc', label: 'Nome (A-Z)' },
  { value: 'hp-desc', label: 'Maior HP' },
  { value: 'attack-desc', label: 'Maior Ataque' },
]

interface QuickFilter {
  id: string
  label: string
  icon: typeof Flame
  activeClass: string
  inactiveClass: string
}

const QUICK_FILTERS: QuickFilter[] = [
  {
    id: 'Fire',
    label: 'Fogo',
    icon: Flame,
    activeClass: 'bg-orange-500 text-white shadow-xs shadow-orange-500/30',
    inactiveClass: 'text-orange-600 hover:bg-orange-50',
  },
  {
    id: 'Water',
    label: 'Água',
    icon: Droplets,
    activeClass: 'bg-sky-500 text-white shadow-xs shadow-sky-500/30',
    inactiveClass: 'text-sky-600 hover:bg-sky-50',
  },
  {
    id: 'Grass',
    label: 'Planta',
    icon: Leaf,
    activeClass: 'bg-emerald-500 text-white shadow-xs shadow-emerald-500/30',
    inactiveClass: 'text-emerald-600 hover:bg-emerald-50',
  },
  {
    id: 'Electric',
    label: 'Elétrico',
    icon: Zap,
    activeClass: 'bg-amber-400 text-slate-900 font-bold shadow-xs shadow-amber-400/30',
    inactiveClass: 'text-amber-600 hover:bg-amber-50',
  },
]

export interface FiltersProps {
  selectedType: string | null
  onTypeSelect: (type: string | null) => void
  onlyFavorites: boolean
  onToggleFavorites: () => void
  favoritesCount: number
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  totalCount: number
  resultCount: number
}

export function Filters({
  selectedType,
  onTypeSelect,
  onlyFavorites,
  onToggleFavorites,
  favoritesCount,
  sortBy,
  onSortChange,
  totalCount,
  resultCount,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2.5 border-t border-slate-200/60 text-xs">
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
        <button
          type="button"
          onClick={() => onTypeSelect(null)}
          className={cn(
            'px-2.5 py-1 rounded-lg font-semibold transition shrink-0',
            selectedType === null && !onlyFavorites
              ? 'bg-slate-900 text-white shadow-xs'
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
                'flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition shrink-0',
                isSelected ? filter.activeClass : filter.inactiveClass
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{filter.label}</span>
            </button>
          )
        })}

        <div className="w-px h-4 bg-slate-200 mx-1 shrink-0" />

        <button
          type="button"
          onClick={onToggleFavorites}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition shrink-0',
            onlyFavorites
              ? 'bg-rose-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50'
          )}
          title="Filtrar por favoritos"
        >
          <Heart
            className={cn(
              'w-3.5 h-3.5 transition-transform',
              onlyFavorites ? 'fill-white text-white' : 'text-rose-500'
            )}
          />
          <span>Favoritos</span>
          {favoritesCount > 0 && (
            <span
              className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none',
                onlyFavorites ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              )}
            >
              {favoritesCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 ml-auto">
        <div className="relative flex items-center">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Ordenar Pokémon"
            className="appearance-none bg-white/70 hover:bg-white pl-8 pr-7 py-1 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-400 transition"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
        </div>

        <span className="text-slate-500 shrink-0 hidden sm:inline font-medium">
          {resultCount === totalCount ? `${totalCount} Pokémon` : `${resultCount} de ${totalCount}`}
        </span>
      </div>
    </div>
  )
}
