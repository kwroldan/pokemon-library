const pokemonListing = document.querySelector("#pokemon-listing");
const spinner = document.querySelector(".spinner")

function capitalizeFirstLetter(someString) {
    return someString.charAt(0).toUpperCase() + someString.slice(1)
}

/* function addPokemonName(pokemon){
    const pokeName = document.createElement("figcaption")
    pokeName.textContent = capitalizeFirstLetter(pokemon.name)
    pokemonListing.append(pokeName)
} */

function addPokemonImage(pokemon){
    const pokePics = document.createElement("figure")
    pokePics.innerHTML = `
    <a href="pokemon.html?pokemon=${pokemon.name}">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <figcaption>${capitalizeFirstLetter(pokemon.name)}</figcaption>
    </a>
    `
    pokemonListing.append(pokePics)
}

const url = "https://pokeapi.co/api/v2/pokemon/?limit=50"
fetch(url)
    .then(response => {
        return response.json()
}).then(parsedResponse => {
    const urls = parsedResponse.results.map(result => result.url)
    const fetches = urls.map(url => fetch(url).then(response => response.json()))
    return Promise.all(fetches)
}).then(responses => {
    spinner.classList.add("hidden")
    responses.forEach(response => {
        addPokemonImage(response);
    })
})

document.querySelector("h1").textContent = "Pokémon!"