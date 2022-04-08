const $pokemon = document.querySelector("#pokemon-detail");
const $spinner = document.querySelector(".spinner")
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
const pokeName = document.querySelector(".pokeName");
const pokeAbilityList = document.querySelector(".abilities-list");

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

function findEnglishLanguage(arrayOfObjects){
    const englishObject = arrayOfObjects.find(object => object.language.name === "en")
    return englishObject.short_effect
}

function createListItem(abilityDetailObject){
    const li = document.createElement("li")
    li.innerHTML = ` 
    <span class="ability-name">${capitalizeFirstLetter(abilityDetailObject.name)}</span>
    <span class="ability-short-description">
        ${findEnglishLanguage(abilityDetailObject.effect_entries)}
    </span>
    `
    pokeAbilityList.append(li)
}

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    })
    .then(parsedResponse => {
        changeTitle(parsedResponse)
        displayPokemonName(parsedResponse)
        addPokemonImage(parsedResponse)
        // Get Ability Descriptions
        const abilities = parsedResponse.abilities.map(result => result.ability)
        const urls = abilities.map(object => object.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches).then(responses => {
            responses.forEach(response => createListItem(response))
            $spinner.classList.add("hidden")
        })
    })