import { ArrowUpDown, ChevronDown, Flame, Droplets, Leaf, Zap, Heart, X } from 'lucide-react'
import type { SortOption } from '../types/pokemon'
import { ALL_POKEMON_TYPES } from '../utils/pokemon'
import { cn } from '../lib/utils'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'id-asc', label: 'Menor número (#1 → #151)' },
  { value: 'id-desc', label: 'Maior número (#151 → #1)' },
  { value: 'name-asc', label: 'Nome (A → Z)' },
  { value: 'hp-desc', label: 'Maior HP' },
  { value: 'attack-desc', label: 'Maior Ataque' },
]

const TYPE_ACTIVE_STYLES: Record<string, string> = {
  normal: 'bg-zinc-700 text-white shadow-xs shadow-zinc-700/25 border border-zinc-800/30',
  fire: 'bg-orange-700 text-white shadow-xs shadow-orange-700/25 border border-orange-800/30',
  water: 'bg-sky-700 text-white shadow-xs shadow-sky-700/25 border border-sky-800/30',
  grass: 'bg-emerald-700 text-white shadow-xs shadow-emerald-700/25 border border-emerald-800/30',
  electric: 'bg-amber-400 text-slate-950 font-bold shadow-xs shadow-amber-400/30 border border-amber-500/40',
  ice: 'bg-cyan-700 text-white shadow-xs shadow-cyan-700/25 border border-cyan-800/30',
  fighting: 'bg-red-700 text-white shadow-xs shadow-red-700/25 border border-red-800/30',
  poison: 'bg-purple-700 text-white shadow-xs shadow-purple-700/25 border border-purple-800/30',
  ground: 'bg-amber-800 text-white shadow-xs shadow-amber-800/25 border border-amber-900/30',
  flying: 'bg-indigo-700 text-white shadow-xs shadow-indigo-700/25 border border-indigo-800/30',
  psychic: 'bg-pink-700 text-white shadow-xs shadow-pink-700/25 border border-pink-800/30',
  bug: 'bg-lime-700 text-white shadow-xs shadow-lime-700/25 border border-lime-800/30',
  rock: 'bg-stone-700 text-white shadow-xs shadow-stone-700/25 border border-stone-800/30',
  ghost: 'bg-violet-700 text-white shadow-xs shadow-violet-700/25 border border-violet-800/30',
  dragon: 'bg-blue-800 text-white shadow-xs shadow-blue-800/25 border border-blue-900/30',
  steel: 'bg-slate-600 text-white shadow-xs shadow-slate-600/25 border border-slate-700/30',
  fairy: 'bg-rose-700 text-white shadow-xs shadow-rose-700/25 border border-rose-800/30',
  dark: 'bg-zinc-800 text-white shadow-xs shadow-zinc-800/25 border border-zinc-900/30',
}

interface QuickFilter {
  id: string
  label: string
  icon: typeof Flame
  activeClass: string
  inactiveClass: string
  iconActiveClass: string
  iconInactiveClass: string
}

const QUICK_FILTERS: QuickFilter[] = [
  {
    id: 'Fire',
    label: 'Fogo',
    icon: Flame,
    activeClass:
      'bg-orange-700 text-white shadow-xs shadow-orange-700/25 border border-orange-800/30',
    inactiveClass:
      'bg-slate-100/90 text-slate-700 border border-slate-200/70 hover:bg-orange-50/90 hover:text-orange-800 hover:border-orange-200',
    iconActiveClass: 'text-white',
    iconInactiveClass: 'text-orange-600',
  },
  {
    id: 'Water',
    label: 'Água',
    icon: Droplets,
    activeClass:
      'bg-sky-700 text-white shadow-xs shadow-sky-700/25 border border-sky-800/30',
    inactiveClass:
      'bg-slate-100/90 text-slate-700 border border-slate-200/70 hover:bg-sky-50/90 hover:text-sky-800 hover:border-sky-200',
    iconActiveClass: 'text-white',
    iconInactiveClass: 'text-sky-600',
  },
  {
    id: 'Grass',
    label: 'Planta',
    icon: Leaf,
    activeClass:
      'bg-emerald-700 text-white shadow-xs shadow-emerald-700/25 border border-emerald-800/30',
    inactiveClass:
      'bg-slate-100/90 text-slate-700 border border-slate-200/70 hover:bg-emerald-50/90 hover:text-emerald-800 hover:border-emerald-200',
    iconActiveClass: 'text-white',
    iconInactiveClass: 'text-emerald-600',
  },
  {
    id: 'Electric',
    label: 'Elétrico',
    icon: Zap,
    activeClass:
      'bg-amber-400 text-slate-950 font-bold shadow-xs shadow-amber-400/30 border border-amber-500/40',
    inactiveClass:
      'bg-slate-100/90 text-slate-700 border border-slate-200/70 hover:bg-amber-50/90 hover:text-amber-900 hover:border-amber-200',
    iconActiveClass: 'text-slate-950',
    iconInactiveClass: 'text-amber-600',
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
  const isQuickFilter = QUICK_FILTERS.some(
    (filter) => filter.id.toLowerCase() === selectedType?.toLowerCase()
  )

  const activeExtraType =
    selectedType && !isQuickFilter
      ? ALL_POKEMON_TYPES.find((t) => t.id.toLowerCase() === selectedType.toLowerCase()) ?? {
          id: selectedType,
          label: selectedType,
        }
      : null

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3.5 sm:px-4 py-2.5 border-t border-slate-200/70 dark:border-slate-800 text-xs bg-slate-50/40 dark:bg-slate-900/40 rounded-b-2xl">
      <div
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full touch-pan-x"
        role="toolbar"
        aria-label="Filtros de Pokémon"
      >
        <button
          type="button"
          onClick={() => {
            onTypeSelect(null)
            if (onlyFavorites) {
              onToggleFavorites()
            }
          }}
          className={cn(
            'px-2.5 py-1 rounded-lg font-semibold transition shrink-0 border cursor-pointer select-none active:scale-95',
            selectedType === null && !onlyFavorites
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs border-slate-900 dark:border-slate-100'
              : 'bg-slate-100/90 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-slate-700 hover:border-slate-300'
          )}
        >
          Todos
        </button>

        {QUICK_FILTERS.map((filter) => {
          const Icon = filter.icon
          const isSelected = selectedType?.toLowerCase() === filter.id.toLowerCase()

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onTypeSelect(isSelected ? null : filter.id)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition shrink-0 cursor-pointer select-none active:scale-95 border',
                isSelected ? filter.activeClass : filter.inactiveClass
              )}
              aria-pressed={isSelected}
            >
              <Icon
                className={cn(
                  'w-3.5 h-3.5 shrink-0 transition-colors',
                  isSelected ? filter.iconActiveClass : filter.iconInactiveClass
                )}
                aria-hidden="true"
              />
              <span>{filter.label}</span>
            </button>
          )
        })}

        {activeExtraType && (
          <button
            type="button"
            onClick={() => onTypeSelect(null)}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition shrink-0 cursor-pointer select-none active:scale-95 border',
              TYPE_ACTIVE_STYLES[activeExtraType.id.toLowerCase()] ??
                'bg-slate-900 text-white shadow-xs border-slate-900'
            )}
            title={`Remover filtro de ${activeExtraType.label}`}
            aria-label={`Remover filtro de ${activeExtraType.label}`}
          >
            <span>{activeExtraType.label}</span>
            <X className="w-3.5 h-3.5 opacity-80 hover:opacity-100 shrink-0" aria-hidden="true" />
          </button>
        )}

        <div className="relative flex items-center shrink-0">
          <select
            value={selectedType ?? ''}
            onChange={(e) => onTypeSelect(e.target.value ? e.target.value : null)}
            aria-label="Filtrar por todos os tipos de Pokémon"
            className="appearance-none bg-slate-100/90 hover:bg-white pl-2.5 pr-7 py-1 text-xs font-semibold text-slate-700 border border-slate-200/70 hover:border-slate-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-400 transition shadow-2xs"
          >
            <option value="">Mais tipos...</option>
            {ALL_POKEMON_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none shrink-0"
            aria-hidden="true"
          />
        </div>

        <div className="w-px h-4 bg-slate-200 mx-0.5 shrink-0" aria-hidden="true" />

        <button
          type="button"
          onClick={onToggleFavorites}
          aria-pressed={onlyFavorites}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition shrink-0 active:scale-95 border cursor-pointer select-none',
            onlyFavorites
              ? 'bg-rose-600 text-white shadow-xs shadow-rose-600/25 border-rose-700/30 ring-1 ring-rose-500/20'
              : 'bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-slate-700 hover:bg-rose-50/90 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-400 hover:border-rose-200'
          )}
          title={
            onlyFavorites
              ? 'Mostrando apenas favoritos (clique para alternar)'
              : 'Filtrar apenas favoritos'
          }
        >
          <Heart
            className={cn(
              'w-3.5 h-3.5 shrink-0 transition-transform duration-150',
              onlyFavorites ? 'fill-white text-white scale-110' : 'text-rose-500 fill-transparent'
            )}
            aria-hidden="true"
          />
          <span>Favoritos</span>
          {favoritesCount > 0 && (
            <span
              className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none tracking-tight transition-colors',
                onlyFavorites ? 'bg-white/25 text-white' : 'bg-slate-200/90 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
              )}
            >
              {favoritesCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t border-slate-200/50 dark:border-slate-800 sm:border-0">
        <div className="relative flex items-center shrink-0">
          <ArrowUpDown
            className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none shrink-0"
            aria-hidden="true"
          />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Ordenar Pokémon por"
            className="appearance-none bg-slate-100/90 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-750 pl-8 pr-7 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400/20 focus:border-slate-400 transition shadow-2xs whitespace-nowrap"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none shrink-0"
            aria-hidden="true"
          />
        </div>

        <div className="text-slate-500 dark:text-slate-400 shrink-0 font-medium whitespace-nowrap text-xs">
          {resultCount === totalCount ? (
            <span>{totalCount} Pokémon</span>
          ) : (
            <span>
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">{resultCount}</strong> de{' '}
              {totalCount}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
