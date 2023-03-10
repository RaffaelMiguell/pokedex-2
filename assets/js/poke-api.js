// linkando API
const pokeApi = {}

function convertForClassPokemon(pokemonDetails) {
    const pokemon = new Pokemon()
    pokemon.name = pokemonDetails.name
    pokemon.numberId = pokemonDetails.id
    
    const types = pokemonDetails.types.map(typeSlot => typeSlot.type.name)
    const abilities = pokemonDetails.abilities.map(abilitySlot => abilitySlot.ability.name)
    const stats = pokemonDetails.stats.map(statSlot => statSlot.stat.name)
    const baseStats = pokemonDetails.stats.map(statSlot => statSlot.base_stat);



    const [type] = types
    const [ability] = abilities
    const [stat] = stats

    pokemon.types = types
    pokemon.type = type
    // ***********
    pokemon.abilities = abilities
    pokemon.ability = ability
    // ***********
    pokemon.stats = stats
    pokemon.stat = stat
    // ***********
    pokemon.baseStats = baseStats;

    pokemon.photo = pokemonDetails.sprites.other.home.front_default
    pokemon.photoAnimation = pokemonDetails.sprites.versions['generation-v']['black-white'].animated.front_default;
    

    console.table(baseStats)
    console.log(pokemonDetails)
    return pokemon
    
}

pokeApi.getPokemonDetail = pokemon => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertForClassPokemon)
}

// criando método para o objto pokeApi
pokeApi.getPokemons = (offset = 0, limit = 0) => {
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
