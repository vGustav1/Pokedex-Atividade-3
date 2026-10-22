import { useState, useMemo } from 'react'
import pokedexData from './data/pokedex-data.json'
import { BentoGrid } from './components/ui/bento-grid'
import { PokemonCard } from './components/PokemonCard'
import { AppleSpotlight } from './components/AppleSpotlight'
import type { Pokemon } from './types/pokemon'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const allPokemon: Pokemon[] = pokedexData.pokemon

  const filteredPokemon = useMemo(() => {
    const term = searchTerm.trim().toLowerCase().replace(/^#/, '')

    return allPokemon.filter((pokemon) => {
      const matchesSearch =
        term === '' ||
        pokemon.name.toLowerCase().includes(term) ||
        String(pokemon.id).includes(term)

      const matchesType =
        selectedType === null ||
        pokemon.types.some((type) => type.name.toLowerCase() === selectedType.toLowerCase())

      return matchesSearch && matchesType
    })
  }, [allPokemon, searchTerm, selectedType])

  const handleRandomSelect = () => {
    const randomIndex = Math.floor(Math.random() * allPokemon.length)
    const randomPokemon = allPokemon[randomIndex]
    setSearchTerm(randomPokemon.name)
    setSelectedType(null)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedType(null)
  }

  return (
    <main className="pokedex">
      <AppleSpotlight
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeSelect={setSelectedType}
        onRandomSelect={handleRandomSelect}
        totalCount={allPokemon.length}
        resultCount={filteredPokemon.length}
      />

      {filteredPokemon.length > 0 ? (
        <BentoGrid aria-label="Lista de Pokémon">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
    </main>
  )
}

export default App
