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
        // const abilityArray = parsedResponse.abilities.forEach(pokeAbility =>     console.log(pokeAbility));
        const abilityArray = parsedResponse.abilities.map(pokeAbility => {
            const li = document.createElement("li")
            li.textContent = capitalizeFirstLetter(`${pokeAbility.ability.name}`)
            pokeAbilityList.append(li)
            console.log(pokeAbility.ability.name)
        })
        
        /*console.log(parsedResponse)
        console.log(parsedResponse.abilities[0].ability.name)
        console.log(parsedResponse.abilities[1].ability.name)*/
        /* fetch(`${parsedResponse.abilities[0].ability.url}`)
            .then(response => {
                return response.json()
            })
            .then(newResponse => {
            console.log(newResponse.flavor_text_entries[0].flavor_text)
            })

        fetch(`${parsedResponse.abilities[1].ability.url}`)
            .then(secondResponse => {
                return secondResponse.json()
            })
            .then(secondNewResponse => {
                console.log(secondNewResponse.flavor_text_entries[0].flavor_text)
            })
        */
    })



/*
    .then(response => {
        const pokeAbilities = response.abilities.map(ability => {
            return fetch(ability).then(response => response.json())
        })
        return Promise.all(pokeAbilities)
    })
    .then(responses => {
        responses.forEach(response => {
            const li = document.createElement("li")
            li.textContent = `${response[0]}`
            pokeAbilityList.append(li)
            $spinner.classList.add("hidden")
        })
    })
*/