let currentPokemon;

async function loadPokemon(){
    for (let i = 1; i < 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log(currentPokemon);
        showPokemon(currentPokemon);
    }
}

function showPokemon(currentPokemon){
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML += `
        <div class="pokeCard">

            <img class="pokeImg" src= ${currentPokemon['sprites']['other']['official-artwork']['front_default']}>
            
            <div id="pokeCardInfo">
                <span>#${currentPokemon['id']}</span>
                <h2>${currentPokemon['name']}</h2>
            </div>

        </div>
    `;
}