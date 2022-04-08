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
    const pokePics = document.querySelector("figure")
    pokePics.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <img src="${pokemon.sprites.back_default}" alt="${pokemon.name} from behind" />
    `
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
    <br>
    <span class="ability-short-description">
        ${findEnglishLanguage(abilityDetailObject.effect_entries)}
    </span>
    <hr>
    `
    pokeAbilityList.append(li)
}

function changeBackgroundColor(pokemon){
    const typeBackground = document.querySelector(".type-background")
    typeBackground.classList.add(`${pokemon.types[0].type.name}`)

}

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    })
    .then(parsedResponse => {
        changeTitle(parsedResponse)
        displayPokemonName(parsedResponse)
        addPokemonImage(parsedResponse)
        changeBackgroundColor(parsedResponse)
        // Get Ability Descriptions
        const abilities = parsedResponse.abilities.map(result => result.ability)
        const urls = abilities.map(object => object.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches).then(responses => {
            responses.forEach(response => createListItem(response))
            $spinner.classList.add("hidden")
        })
    })