function showPokecard(i){
    return `
    <div onclick="openPokeInfoBg(${i})" id="pokeCard${i}" class="pokeCard">

        <img class="pokeImg" alt="Image not found" loading="lazy" src= ${currentPokemon['sprites']['other']['official-artwork']['front_default']}>
        
        <div id="pokeCardInfo">
            <p>#<span id="pokeId${i}">${currentPokemon['id']}</span></p>
            <h2>${currentPokemon['name']}</h2>
            <div id="pokeCardTypes${i}" class="pokeCardTypes"></div>
        </div>
    </div>`
}


function showPokeInfo(i){
    return `
        <div onclick="slideDown(${i})" id="slideDown" class="slideButton"><img src="./img/icon/arrow-back.ico"></div>

        <div class="pokeInfoCard">
            <div id="pokeInfoTop${i}" class="pokeInfoTop">
                <div>
                    <h1> #${currentPokemon['id']} </h1>
                    <h1>${currentPokemon['name']}</h1>
                    <div id="pokeInfoTypes${i}" class="pokeInfoTypes"></div>
                </div>
                <img class="pokeInfoImg" alt="Image not found" loading="lazy" src= ${currentPokemon['sprites']['other']['official-artwork']['front_default']}>
            </div>

            <div class="pokeInfoDetails_bg">
                <div class="generalInfo">
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
                    <img onclick="closeQuestionMarkInfo()" src="./img/icon/x-mark.ico">
                </div>

                <div class="infoDetails">
                    <h1>Base Stats</h1>
                    <div id="stats${i}" class="stats"></div>
                </div>
            </div>
        </div>

        <div onclick="slideUp(${i})" class="slideButton"><img src="./img/icon/arrow-forward.ico"></div>`
}


function showStats(i, j, info){
    return`
    <div class="infoStats">
        <div>${info['stat']['name']}</div>
        <div class="baseStat">${info['base_stat']}
            <div class="processbar">
                <div id="processbarValue${i}${j}" class="processbarValue"></div>
            </div>
        </div>
    </div>
    `
}


function filterOption(i, type){
    return `
    <div>
        <button onclick="initFilter(${i})" class="background_${type}">${type}</button>
    </div>`
}

