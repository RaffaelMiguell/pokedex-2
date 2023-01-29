const idParaIncluirLista = document.getElementById('pokemonList')
const btnLoad = document.getElementById('btnLoad')
const limit = 10
let offset = 0

// iniciando consumo da api pokeapi

function loadPokemonsItens(offset, limit) {
   pokeApi.getPokemons(offset, limit).then((pokemon = []) => {
      const newHtml = pokemon
         .map(
            pokemon =>
               `
               <li class="pokemon">
               <div class="cobertura ${pokemon.type}">
               </div>
               <div class="inf-pokemon">
                  <span class="name">${pokemon.numberId}. ${pokemon.name}</span>
               </div>

               <div class="box-img ${pokemon.type}">
                  <figure class="div-img-pokemon">
                     <img src="${pokemon.photo}" alt="Imagem do Pokemon ${
                  pokemon.name
               }"/>
                     </figure>
               </div>

               <div class="detail">
                  <ul class="types">
                     ${pokemon.types.map(type =>
                        `<li class="type ${type}">${type}</li>`)
                        .join('')}
                  </ul>
               </div>
            </li>`
         )
         .join('')
      idParaIncluirLista.innerHTML += newHtml
   })
}

loadPokemonsItens(offset, limit)

btnLoad.addEventListener('click', () => {
   offset += limit
   loadPokemonsItens(offset, limit)
   console.log('hello world, my brother/sister')
})
