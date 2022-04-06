const $pokemon = document.querySelector("#pokemon");
const $spinner = document.querySelector(".spinner")

function capitalizeFirstLetter(someString) {
    return someString.charAt(0).toUpperCase() + someString.slice(1)
}

function changeTitle(pokemon){
    const title = document.querySelector("title")
    title.textContent = capitalizeFirstLetter(pokemon.name)
}

function addPokemonImage(pokemon){
    const div = document.createElement("div")
    div.innerHTML = `
    <a href="pokemon.html?pokemon=${pokemon.name}">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    </a>
    `
    $pokemon.append(div)
}


const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
}).then(parsedResponse => {
    addPokemonImage(parsedResponse)
    changeTitle(parsedResponse)
    $spinner.classList.add("hidden")
})