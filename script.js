let currentPokemon;
let loadingrangeStart = 1;
let loadingrangeEnd = 21;
let allTypes = ['fire', 'grass', 'water', 'poison', 'flying', 'bug', 'normal', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'steel', 'ice', 'ghost', 'dragon', 'dark'];
let allPokemon = [];
let filter = [];

async function loadPokemon(){
    for (let i = loadingrangeStart; i < loadingrangeEnd; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        showPokemon(i);
    }
    loadAll();
}


async function loadAll(){
    for (let i = 1; i < 901; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let pokemon = await response.json();
        allPokemon.push(pokemon);
    }
}


function showPokemon(i){
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML += showPokecard(i);
    getType(i);
    setColorBox(i);
}


function loadMore(){
    loadingrangeStart = loadingrangeEnd;
    loadingrangeEnd = loadingrangeEnd + 10;
    loadPokemon();
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


function openPokeInfoBg(i){
    document.body.style.overflow = 'hidden';
    document.getElementById('pokeInfo_bg').classList.remove('d-none');
    document.getElementById('pokeInfo').classList.remove('d-none');
    loadPokeInfo(i);
}


async function loadPokeInfo(i){
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    document.getElementById('pokeInfo').innerHTML= showPokeInfo(i);
    loadInfoDetails(i);
    setPokeInfoType(i);
    setColorPokeInfoBg(i);
    checkSlideNumber(i);
}



function loadInfoDetails(i){
    let infoStats = document.getElementById(`stats${i}`);
    infoStats.innerHTML = '';
    let stats = currentPokemon['stats'];
    for (let j = 0; j < stats.length; j++) {
        let info = stats[j];
        infoStats.innerHTML += showStats(i, j, info);
        loadProcessbarValue(i, j, info);
    }
}


function loadProcessbarValue(i, j, info){
    document.getElementById(`processbarValue${i}${j}`).style.width =`${info['base_stat']}px`;
}


function setPokeInfoType(i){
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        document.getElementById(`pokeInfoTypes${i}`).innerHTML+=` <span id="pokeInfoType${i}${j}">${type}</span> `
        setColorInfoType(i, j, type);
    }
}


function setColorInfoType(i, j, type){
    document.getElementById(`pokeInfoType${i}${j}`).classList.add(`background_${type}`);
}


function setColorPokeInfoBg(i){
    let color = currentPokemon['types'][0]['type']['name'];
    document.getElementById(`pokeInfoTop${i}`).classList.add(`backgroundGradient_${color}`);
}


function checkSlideNumber(i){
    if(i == 1){
        document.getElementById(`slideDown`).style.opacity = 0;
    }
}


function slideDown(i){
    i--;
    loadPokeInfo(i);
}


function slideUp(i){
    i++;
    loadPokeInfo(i);
}


function closePokeInfo(){
    document.body.style.overflow = 'auto';
    document.getElementById('pokeInfo_bg').classList.add('d-none');
    document.getElementById('filterGroup').classList.add('d-none');
    document.getElementById('pokeInfo').classList.add('d-none');
    document.getElementById('showMoreButton').classList.remove('d-none');
}


function openQuestionMarkInfo(){
    document.getElementById('questionMarkInfo').classList.remove('d-none');
    document.getElementById('questionmark').setAttribute('onclick', `javascript: closeQuestionMarkInfo()`);
}


function closeQuestionMarkInfo(){
    document.getElementById('questionMarkInfo').classList.add('d-none');
    document.getElementById('questionmark').setAttribute('onclick', `javascript: openQuestionMarkInfo()`);
}


function displayFilter(){
    document.body.style.overflow = 'hidden';
    document.getElementById('showMoreButton').classList.add('d-none');
    document.getElementById('pokeInfo_bg').classList.remove('d-none');
    document.getElementById('filterGroup').classList.remove('d-none');
    document.getElementById('filterGroup').innerHTML='';

    for (let i = 0; i < allTypes.length; i++) {
        let type = allTypes[i];
        document.getElementById('filterGroup').innerHTML += filterOption(i, type);
    }
}

function initFilter(i){
    document.getElementById('pokedex').innerHTML='';
    closePokeInfo();
    filterGroups(i);
}

async function filterGroups(i){
    let selectedGroup = allTypes[i];
    let response = await fetch(`https://pokeapi.co/api/v2/type/${selectedGroup}`);
    filter = await response.json();
    getPokeNames();
}


function getPokeNames(){
    let pokeList = filter['pokemon'];
    for (let k = 0; k < pokeList.length; k++) {
        let pokeName = pokeList[k]['pokemon']['name'];
        loadPokeFilter(pokeName);
    }
}


async function loadPokeFilter(pokeName){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    currentPokemon = await response.json();
    let i = currentPokemon['id'];

    if(i <=1101){
        showPokeFilter(i);
    }
}


function showPokeFilter(i){
        let pokedex = document.getElementById('pokedex');
        pokedex.innerHTML += showPokecard(i);
        getType(i);
        setColorBox(i);
}


function showSearchbar(){
    document.getElementById('input').style.transform = 'scaleX(1)';
    document.getElementById('searchButton').src = "./img/icon/x-mark.ico"
    document.getElementById('searchButton').setAttribute('onclick', `javascript: hideSearchbar()`);
}


function hideSearchbar(){
    document.getElementById('input').style.transform = 'scaleX(0.0)';
    document.getElementById('searchButton').src = "./img/icon/search.ico"
    document.getElementById('searchButton').setAttribute('onclick', `javascript: showSearchbar()`);
}


// async function loadSearch(){
//     for (let i = 1; i < 1154; i++) {
//         let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//         let response = await fetch(url);
//         pokemon = await response.json();
//         allNames.push(pokemon['name']);
//     }
// }

// function search(){
//     let input = document.getElementById('input').value;
//     let filter = input.value.toLocaleLowerCase();
//     for (i = 0; i < allNames.length; i++) {
//         if (allNames[i].toLowerCase().includes(filter)) {
//             search[i].style.display = '';
//         } else {
//             search[i].style.display = "none";
//         }
//     }
// }




