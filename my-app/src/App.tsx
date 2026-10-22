import pokedexData from './data/pokedex-data.json'
import { PokemonCard } from './components/PokemonCard'
import './App.css'

function App() {
  const pokemonList = pokedexData.pokemon

  return (
    <main className="pokedex">
      <div className="search-area" />

      <section className="pokemon-grid" aria-label="Lista de Pokémon">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </main>
  )
}

export default App
