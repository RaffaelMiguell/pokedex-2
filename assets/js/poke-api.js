// linkando API
const pokeApi = {}

function convertForClassPokemon(pokemonDetails) {
   const pokemon = new Pokemon()
   pokemon.name = pokemonDetails.name
   pokemon.numberId = pokemonDetails.id
   const types = pokemonDetails.types.map(typeSlot => typeSlot.type.name)
   const [type] = types

   pokemon.types = types
   pokemon.type = type

   pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default

   return pokemon
}

pokeApi.getPokemonDetail = pokemon => {
   return fetch(pokemon.url)
      .then(response => response.json())
      .then(convertForClassPokemon)
}

// criando método para o objto pokeApi
pokeApi.getPokemons = (offset = 0, limit = 30) => {
   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
   
   return (
      fetch(url)
         /* convertendo recurso 'ReadableStream' para .json */
         .then(response => response.json())
         /* após receber response, filtrar "results"*/
         .then(jsonBody => jsonBody.results)
         .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
         //  mapeando para uma lista de pokemons
         .then(detailsRequests => Promise.all(detailsRequests))
         //  promisse de todas as requisições da lista
         .then(pokemonDetails => {
            console.log(pokemonDetails)
            return pokemonDetails
            // devolve a lista de pokemons
         })
      //  .catch(error => console.error(error))
      //  .finally(() => console.log('Requisição feita com sucesso.'))
   )
}

console.log(pokeApi)
