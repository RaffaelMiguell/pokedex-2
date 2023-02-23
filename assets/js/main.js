const idParaIncluirLista = document.getElementById('pokemonList')
const btnLoad = document.getElementById('btnLoad')
const limit = 3
let offset = 0

// iniciando consumo da api pokeapi

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemon = []) => {
        const newHtml = pokemon
            .map(
                pokemon => `
                <li class="pokemon">
                    <div class="cobertura ${pokemon.type}">
                    </div>
                    <div class="inf-pokemon">
                        <span class="name">${pokemon.numberId}. ${pokemon.name}
                        </span>

                    </div>

                    <div class="box-img ${pokemon.type}">
                        <figure class="div-img-pokemon">
                            <img src="${pokemon.photo}"
                            alt="Imagem do Pokemon ${pokemon.name}"/>
                        </figure>
                    </div>

                    
                    <div class="detail">
                        <ul class="types">
                        ${pokemon.types
                            .map(
                                type => `<li class="type ${type}">${type}</li>`
                            )
                            .join('')}
                        </ul>
                    </div>

                    <div class="cardMoreDetails ${pokemon.type}" id="card-${
                    pokemon.numberId
                }">
                        <ul class="moreDetails">
                            <button class="btnClose" onclick="hidePopUp(${
                                pokemon.numberId
                            })">
                            <svg
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"
                                ></path>
                                <path d="m15 9-6 6"></path>
                                <path d="m9 9 6 6"></path>
                            </svg>
                            </button>
                            <li class="type ${pokemon.type}">${
                    pokemon.ability
                }</li>
                        </ul>
                </div>
        
                <button class="btnShow" onclick="showPopUp(${
                    pokemon.numberId
                })">
                    <svg
                        width="22"
                        height="22"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m12 8-3.5 3.5M12 16V8v8Zm0-8 3.5 3.5L12 8Z"></path>
                        <path
                            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                        ></path>
                    </svg>
                </button>
                   
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
})

// o id dinâmico fica interagindo diretamente com cada card, conforme o pokemon selecionado.
function showPopUp(numberId) {
    const card = document.querySelector(`#card-${numberId}`)
    const cards = document.querySelectorAll('.cardMoreDetails')

    // verificar todos os cards e remove a classe "show"
    cards.forEach(card => {
        card.classList.remove('show')
    })

    card.classList.add('show')
}

function hidePopUp(numberId) {
    const card = document.querySelector(`#card-${numberId}`)

    card.classList.remove('show')

    // setTimeout(() => {
    //     card.classList.remove("show");
    //   }, 5000);
}
