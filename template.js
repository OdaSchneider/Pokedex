function showPokecard(i){
    let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`;
    
    return `
    <div onclick="openPokeInfoBg(${i})" id="pokeCard${i}" class="pokeCard filter">

        <img id="pokeCardImg" class="pokeImg" alt="Image not found" loading="lazy" src= ${url}>;
        
        <div id="pokeCardInfo">
            <p>#<span id="pokeId${i}">${currentPokemon['id']}</span></p>
            <h2 id="currentPokemonName${i}">${currentPokemon['name']}</h2>
            <div id="pokeCardTypes${i}" class="pokeCardTypes"></div>
        </div>
    </div>`
}


function showPokeInfo(i){
    let url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`;
   
    return `
        <button onclick="slideDown(${i})" id="slideDown" class="slideButton"><img src="./img/icon/arrow-back.ico"></button>

        <div class="pokeInfoCard">
            <div id="pokeInfoTop${i}" class="pokeInfoTop">
                <div>
                    <h1> #${currentPokemon['id']} </h1>
                    <h1>${currentPokemon['name']}</h1>
                    <div id="pokeInfoTypes${i}" class="pokeInfoTypes"></div>
                </div>
                <img id="pokeInfoImg" class="pokeInfoImg" alt="Image not found" loading="lazy" src= ${url}>
            </div>

            <div class="pokeInfoDetails_bg">

                <div id="responsiveButton" class="responsiveButton d-none">
                    <button id="generalInfoButton" onclick="showGeneralInfo()">Base Info</button>
                    <button id="infoDetailsButton" onclick="showInfoDetails()">Base Stats</button>
                </div>

                <div id="generalInfo" class="generalInfo">
                        <div>
                            <p>Weight</p><br>
                            <p>${currentPokemon['weight']/10} kg</p>
                        </div> 
                        
                        <div>
                            <p>Hight</p><br>
                            <p>${currentPokemon['height']/10} m</p>
                        </div> 
                        <div>
                            <p>Base Experience</p><br>
                            <p>${currentPokemon['base_experience']} <img id="questionmark" class="questionmark" onclick="openQuestionMarkInfo()" src="./img/icon/question-mark.ico"></p>
                        </div>
                </div>

                <div id="questionMarkInfo" class="questionMarkInfo d-none">	
                    <p>Base experience gained for defeating this Pokémon</p>
                </div>

                <div id="infoDetails" class="infoDetails">
                    <h1>Base Stats</h1>
                    <div id="stats${i}" class="stats"></div>
                </div>
            </div>
        </div>

        <button onclick="slideUp(${i})" class="slideButton"><img src="./img/icon/arrow-forward.ico"></button>`
}


function showStats(i, j, info){
    return`
    <div class="infoStats">
        <div id="infoTitle">
            ${info['stat']['name']}
        </div>
        
        <div class="baseStat">
            <div class="processbar">
                <div id="processbarValue${i}${j}" class="processbarValue">
                    <span>${info['base_stat']}</span>
                </div>
            </div>
        </div>
    </div>
    `
}


function filterButton(i, type){
    return `
    <div>
        <button onclick="initFilter(${i})" class="background_${type}">${type}</button>
    </div>`
}

