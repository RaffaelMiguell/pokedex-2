const idParaIncluirLista = document.getElementById('pokemonList')
const btnLoad = document.getElementById('btnLoad')
const limit = 6
let offset = 0

// iniciando consumo da api pokeapi

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemon = []) => {
        const newHtml = pokemon
            .map(
                pokemon => `
                <li class="pokemon">
                <div class="cobertura ${pokemon.type}"></div>
                <div class="inf-pokemon">
                    <span class="name">${pokemon.numberId}. ${pokemon.name} </span>
                </div>
            
                <div class="box-img ${pokemon.type}">
                    <figure class="div-img-pokemon">
                        <img
                            src="${pokemon.photo}"
                            alt="Imagem do Pokemon ${pokemon.name}"
                        />
                    </figure>
                </div>
            
                <div class="detail">
                    <ul class="types">
                        ${pokemon.types .map( type => `
                        <li class="type ${type}">${type}</li>
                        ` ) .join('')}
                    </ul>
                </div>
            
                <div class="cardMoreDetails ${pokemon.type}" id="card-${pokemon.numberId}">
                    <div class="moreDetails">
                        <table class="tbCard">
                            <tbody>
                            <!-- inserido o método "index" para que seja possível realizar o callback, utilizado no baseStats (estudar mais a respeito) -->
                                ${pokemon.stats.map((stat, index) => `
                                    <tr>
                                    <td class="tdColumnL">&nbsp&nbsp${stat}</td>
                                    <td class="tdColumnR">${pokemon.baseStats[index]}</td>
                                    </tr>
                                    `).join('')
                                    }
                            </tbody>
                        </table>
                        <img class="imgMoreDetails"src="${pokemon.photoAnimation}" alt="Imagem do Pokemon ${pokemon.name}"/>

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
                              <path d="m12 16-3.5-3.5M12 8v8-8Zm0 8 3.5-3.5L12 16Z"></path>
                              <path
                                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                              ></path>
                          </svg>
                        </button>
                    </div>
                </div>
            
                <button class="btnShow" onclick="showPopUp(${pokemon.numberId})">
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
            </li>
            `
            )
            .join('')
        idParaIncluirLista.innerHTML += newHtml
    })
}

loadPokemonsItens(offset, limit)

btnLoad.addEventListener('click', () => {
    offset += limit
    loadPokemonsItens(offset, limit)
    closeWindows()
})

// o id dinâmico fica interagindo diretamente com cada card, conforme o pokemon selecionado.
function showPopUp(numberId) {
    const card = document.querySelector(`#card-${numberId}`)

    closeWindows()
    card.classList.add('show')
}

function hidePopUp(numberId) {
    const card = document.querySelector(`#card-${numberId}`)

   card.classList.remove('show')

    // setTimeout(() => {
    //     card.classList.remove("show");
    //   }, 5000);
}

function closeWindows() {
    const cards = document.querySelectorAll('.cardMoreDetails')
    // verificar todos os cards e remove a classe "show"
    cards.forEach(card => {
       card.classList.remove('show')
    })
}