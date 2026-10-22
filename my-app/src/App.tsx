import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import pokedexData from './data/pokedex-data.json'
import { BentoGrid } from './components/ui/bento-grid'
import { PokemonCard } from './components/PokemonCard'
import { PokemonDetails } from './components/PokemonDetails'
import { PokemonCompare } from './components/PokemonCompare'
import { TrainersModal } from './components/TrainersModal'
import { AppleSpotlight } from './components/AppleSpotlight'
import { useFavorites } from './hooks/useFavorites'
import { sortPokemon } from './utils/pokemon'
import type { Pokemon, SortOption } from './types/pokemon'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('id-asc')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [comparePair, setComparePair] = useState<[Pokemon, Pokemon] | null>(null)
  const [isTrainersOpen, setIsTrainersOpen] = useState(false)

  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const allPokemon: Pokemon[] = pokedexData.pokemon

  const filteredPokemon = useMemo(() => {
    const term = searchTerm.trim().toLowerCase().replace(/^#/, '')

    const filtered = allPokemon.filter((pokemon) => {
      const matchesSearch =
        term === '' ||
        pokemon.name.toLowerCase().includes(term) ||
        String(pokemon.id).includes(term)

      const matchesType =
        selectedType === null ||
        pokemon.types.some((type) => type.name.toLowerCase() === selectedType.toLowerCase())

      const matchesFavorites = !onlyFavorites || isFavorite(pokemon.id)

      return matchesSearch && matchesType && matchesFavorites
    })

    return sortPokemon(filtered, sortBy)
  }, [allPokemon, searchTerm, selectedType, onlyFavorites, isFavorite, sortBy])

  const activeNavigationList = useMemo(() => {
    if (selectedPokemon && filteredPokemon.some((p) => p.id === selectedPokemon.id)) {
      return filteredPokemon
    }
    return allPokemon
  }, [allPokemon, filteredPokemon, selectedPokemon])

  const selectedIndex = selectedPokemon
    ? activeNavigationList.findIndex((p) => p.id === selectedPokemon.id)
    : -1

  const hasPrevious = selectedIndex > 0
  const hasNext = selectedIndex >= 0 && selectedIndex < activeNavigationList.length - 1

  const handlePrevious = () => {
    if (hasPrevious) {
      setSelectedPokemon(activeNavigationList[selectedIndex - 1])
    }
  }

  const handleNext = () => {
    if (hasNext) {
      setSelectedPokemon(activeNavigationList[selectedIndex + 1])
    }
  }

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * allPokemon.length)
    const randomPokemon = allPokemon[randomIndex]
    setSearchTerm(randomPokemon.name)
    setSelectedType(null)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedType(null)
    setOnlyFavorites(false)
    setSortBy('id-asc')
  }

  const handleOpenCompare = (pokemon: Pokemon) => {
    let opponent = allPokemon.find((p) => p.id !== pokemon.id) ?? allPokemon[0]
    if (pokemon.id === 1) opponent = allPokemon.find((p) => p.id === 4) ?? opponent
    else if (pokemon.id === 4) opponent = allPokemon.find((p) => p.id === 7) ?? opponent
    else if (pokemon.id === 7) opponent = allPokemon.find((p) => p.id === 1) ?? opponent

    setComparePair([pokemon, opponent])
    setSelectedPokemon(null)
  }

  const handleSpotlightCompare = () => {
    const p1 = allPokemon[0]
    const p2 = allPokemon[3]
    setComparePair([p1, p2])
  }

  return (
    <main className="pokedex">
      <AppleSpotlight
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenCompare={handleSpotlightCompare}
        onOpenTrainers={() => setIsTrainersOpen(true)}
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
        onRandomSelect={handleRandomSelect}
        onlyFavorites={onlyFavorites}
        onToggleFavorites={() => setOnlyFavorites((prev) => !prev)}
        favoritesCount={favorites.length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={allPokemon.length}
        resultCount={filteredPokemon.length}
      />

      {filteredPokemon.length > 0 ? (
        <BentoGrid aria-label="Lista de Pokémon">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => setSelectedPokemon(pokemon)}
              isFavorite={isFavorite(pokemon.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </BentoGrid>
      ) : (
        <div className="empty-state">
          <p className="empty-title">Nenhum Pokémon encontrado</p>
          <p className="empty-description">
            Tente buscar por outro nome ou número, ou redefina os filtros.
          </p>
          <button type="button" onClick={handleClearFilters} className="empty-button">
            Limpar filtros
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedPokemon && (
          <PokemonDetails
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={hasPrevious}
            hasNext={hasNext}
            isFavorite={isFavorite(selectedPokemon.id)}
            onToggleFavorite={() => toggleFavorite(selectedPokemon.id)}
            onCompare={handleOpenCompare}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {comparePair && (
          <PokemonCompare
            pokemon1={comparePair[0]}
            pokemon2={comparePair[1]}
            allPokemon={allPokemon}
            onClose={() => setComparePair(null)}
            onSelectPokemon1={(p) => setComparePair([p, comparePair[1]])}
            onSelectPokemon2={(p) => setComparePair([comparePair[0], p])}
            onSwap={() => setComparePair([comparePair[1], comparePair[0]])}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTrainersOpen && (
          <TrainersModal
            onClose={() => setIsTrainersOpen(false)}
            onSelectPokemon={(pokemon) => {
              setIsTrainersOpen(false)
              setSelectedPokemon(pokemon)
            }}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
