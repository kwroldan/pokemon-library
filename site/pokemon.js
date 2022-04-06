const $pokemon = document.querySelector("#pokemon-detail");
const $spinner = document.querySelector(".spinner")
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const pokeName = document.querySelector(".pokeName");

function capitalizeFirstLetter(someString) {
    return someString.charAt(0).toUpperCase() + someString.slice(1)
}

function changeTitle(pokemon){
    const title = document.querySelector("title")
    title.textContent = capitalizeFirstLetter(pokemon.name)
}

function addPokemonImage(pokemon){
    const pokePics = document.createElement("div")
    pokePics.innerHTML = `
    <a href="pokemon.html?pokemon=${pokemon.name}">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    </a>
    `
    $pokemon.append(pokePics)
}

function displayPokemonName(pokemon){
    pokeName.textContent = capitalizeFirstLetter(pokemon.name)
}

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    })
    .then(parsedResponse => {
        changeTitle(parsedResponse)
        displayPokemonName(parsedResponse)
        addPokemonImage(parsedResponse)
        console.log(parsedResponse)
        $spinner.classList.add("hidden")
    })