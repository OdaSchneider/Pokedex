let currentPokemon;

async function loadPokemon(){
    for (let i = 1; i < 50; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log(currentPokemon);
        showPokemon(i);
    }
}


function showPokemon(i){
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML += `
        <div id="pokeCard${i}" class="pokeCard">

            <img class="pokeImg" src= ${currentPokemon['sprites']['other']['official-artwork']['front_default']}>
            
            <div id="pokeCardInfo">
                <span>#${currentPokemon['id']}</span>
                <h2>${currentPokemon['name']}</h2>
                <div id="pokeCardTypes${i}" class="pokeCardTypes"></div>
            </div>
            
        </div>
    `
    getType(i);
    setColorBox(i);
}


function getType(i){
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        document.getElementById(`pokeCardTypes${i}`).innerHTML+=` <span id="type${i}${j}">${type}</span> `
        setColorType(i, j, type);
    }
}


function setColorType(i, j, type){
    document.getElementById(`type${i}${j}`).classList.add(`background_${type}`);
}

function setColorBox(i){
    let color = currentPokemon['types'][0]['type']['name'];
    document.getElementById(`pokeCard${i}`).classList.add(`border_${color}`);
}