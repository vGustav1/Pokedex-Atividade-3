# 🎮 Pokédex Interativa — React + Vite

Aplicação web desenvolvida com **React 19, Vite e Tailwind CSS**, permitindo explorar, pesquisar, filtrar, ordenar e visualizar detalhes completos dos 151 Pokémon da 1ª geração.

---

## 🚀 Funcionalidades

- 🔎 **Pesquisa em Tempo Real**: Busca instantânea por nome ou número/ID (ex: `Pikachu`, `#025`).
- 🧬 **Filtro por Tipos**: Filtragem por elementos com badges temáticas (Fogo, Água, Planta, Elétrico, etc.).
- 📊 **Ordenação Dinâmica**:
  - Menor número (#1 → #151)
  - Maior número (#151 → #1)
  - Nome (A-Z)
  - Maior HP
  - Maior Ataque
- ⭐ **Sistema de Favoritos**: Persistência no `localStorage` permitindo favoritar Pokémon e filtrar rapidamente apenas os favoritos.
- 🎲 **Pokémon Aleatório**: Botão para selecionar e destacar uma criatura aleatória.
- ⚔️ **Comparador de Pokémon**: Duelo lado a lado comparando os 6 atributos com barras animadas, cálculo de vantagens e sugestões de confrontos clássicos.
- 🧑‍🚀 **Modal de Treinadores e Insígnias**: Visualização dos treinadores clássicos (Ash, Brock, Misty, etc.), contagem de insígnias e suas respectivas equipes de Pokémon.
- 🧬 **Filtro Completo dos 18 Tipos**: Seletor com todos os tipos oficiais de Pokémon com cores dinâmicas para cada elemento.
- 📄 **Modal de Detalhes Completo**:
  - Exibição da arte oficial em alta definição.
  - **Todos os 6 atributos obrigatórios** com barras de progresso proporcionais:
    - HP
    - Ataque
    - Defesa
    - Ataque Especial
    - Defesa Especial
    - Velocidade
    - Total de Atributos (Soma dos stats)
  - Navegação entre Pokémon (Anterior / Próximo) diretamente no modal e via teclado (setas e `Escape`).
- 🍱 **Grid Responsivo**: Layout modular inspirado na estética Bento Grid, totalmente adaptado para telas mobile, tablets e desktop.
- ⚠️ **Tratamento de Estado Vazio**: Mensagem amigável com botão de restauração quando nenhum Pokémon corresponde à pesquisa.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animações e transições)
- **Lucide React** (ícones de interface)
- **clsx & tailwind-merge** (utilitários de composição de classes)

---

## 📁 Estrutura do Projeto

```text
my-app/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── bento-grid.tsx     # Container e itens do Bento Grid
│   │   ├── AppleSpotlight.tsx     # Barra de pesquisa e atalhos rápidos
│   │   ├── Filters.tsx            # Seletor de ordenação e favoritos
│   │   ├── PokemonCard.tsx        # Card individual do Pokémon
│   │   └── PokemonDetails.tsx     # Modal com atributos e barras de progresso
│   ├── data/
│   │   └── pokedex-data.json      # Dados dos 151 Pokémon e tipos
│   ├── hooks/
│   │   └── useFavorites.ts        # Hook para persistência no localStorage
│   ├── types/
│   │   └── pokemon.ts             # Interfaces TypeScript e definições de tipos
│   ├── utils/
│   │   ├── favorites.ts           # Helpers do localStorage
│   │   └── pokemon.ts             # Formatação de ID, URLs e ordenação
│   ├── App.tsx                    # Orquestrador da aplicação
│   ├── App.css                    # Estilos auxiliares
│   └── main.tsx                   # Ponto de entrada
```

---

## ▶️ Instruções de Execução

1. Acesse o diretório da aplicação:
   ```bash
   cd my-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse no seu navegador:
   ```text
   http://localhost:5173
   ```

---

## 📦 Build para Produção

Para validar e gerar os arquivos estáticos de produção:

```bash
cd my-app
npm run build
```
