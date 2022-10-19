let currentPokemon;
let loadingrangeStart = 1;
let loadingrangeEnd = 21;
let allTypes = ['fire', 'grass', 'water', 'poison', 'flying', 'bug', 'normal', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock', 'steel', 'ice', 'ghost', 'dragon', 'dark'];
let allPokemon = [];
let filter = [];

function init() {
    document.getElementById('showMoreButton').classList.add('d-none');
    loadAll();
    loadMainPage();
}


function loadMainPage() {
    setTimeout(showMainPage, 5000);
}


function showMainPage() {
    document.getElementById("loaderImg").style.display = "none";
    document.getElementById("pokedex").style.display = "flex";
    document.getElementById('showMoreButton').classList.remove('d-none');
    loadPokemon();
}

function homescreen() {
    loadingrangeStart = 1;
    loadingrangeEnd = 21;
    window.scrollTo(0, 0);
    document.getElementById('showMoreButton').classList.remove('d-none');
    document.getElementById('pokedex').innerHTML = '';
    loadPokemon();
}


async function loadPokemon() {
    for (let i = loadingrangeStart; i < loadingrangeEnd; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        currentPokemon = await response.json();
        showPokemon(i);
    }
}


async function loadAll() {
    allPokemon = [];
    for (let i = 1; i < 901; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let pokemon = await response.json();
        allPokemon.push(pokemon);
    }
}


function showPokemon(i) {
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML += showPokecard(i);
    designCard(i);
}


function loadMore() {
    loadingrangeStart = loadingrangeEnd;
    loadingrangeEnd = loadingrangeEnd + 10;
    loadPokemon();
}

function designCard(i) {
    getType(i);
    setColorBox(i);
    checkNameLenght(i);
}

function getType(i) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        document.getElementById(`pokeCardTypes${i}`).innerHTML += ` <span id="type${i}${j}">${type}</span> `
        setColorType(i, j, type);
    }
}


function setColorType(i, j, type) {
    document.getElementById(`type${i}${j}`).classList.add(`background_${type}`);
}


function setColorBox(i) {
    let color = currentPokemon['types'][0]['type']['name'];
    document.getElementById(`pokeCard${i}`).classList.add(`border_${color}`);
}


function checkNameLenght(i) {
    let pokeNameLenght = document.getElementById(`currentPokemonName${i}`).innerText;
    if (pokeNameLenght.length >= 14) {
        document.getElementById(`currentPokemonName${i}`).style.fontSize = '14px';
    } if (pokeNameLenght.length >= 19) {
        document.getElementById(`currentPokemonName${i}`).style.fontSize = '12px';
    }
}


function openPokeInfoBg(i) {
    document.body.style.overflow = 'hidden';
    document.getElementById('pokeInfo_bg').classList.remove('d-none');
    document.getElementById('pokeInfo').classList.remove('d-none');
    loadPokeInfo(i);
}


async function loadPokeInfo(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    currentPokemon = await response.json();
    document.getElementById('pokeInfo').innerHTML = showPokeInfo(i);
    loadInfoDetails(i);
    setPokeInfoType(i);
    setColorPokeInfoBg(i);
    checkSlideNumber(i);
}



function loadInfoDetails(i) {
    let infoStats = document.getElementById(`stats${i}`);
    infoStats.innerHTML = '';
    let stats = currentPokemon['stats'];
    for (let j = 0; j < stats.length; j++) {
        let info = stats[j];
        infoStats.innerHTML += showStats(i, j, info);
        loadProcessbarValue(i, j, info);
    }
}


function loadProcessbarValue(i, j, info) {
    document.getElementById(`processbarValue${i}${j}`).style.width = `${info['base_stat']}px`;
}


function setPokeInfoType(i) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        let type = types[j]['type']['name'];
        document.getElementById(`pokeInfoTypes${i}`).innerHTML += ` <button onclick="initFilterFromInfo(${i}${j})" id="pokeInfoType${i}${j}">${type}</button> `
        setColorInfoType(i, j, type);
    }
}


function setColorInfoType(i, j, type) {
    document.getElementById(`pokeInfoType${i}${j}`).classList.add(`background_${type}`);
}


function setColorPokeInfoBg(i) {
    let color = currentPokemon['types'][0]['type']['name'];
    document.getElementById(`pokeInfoTop${i}`).classList.add(`backgroundGradient_${color}`);
}


function checkSlideNumber(i) {
    if (i == 1) {
        document.getElementById(`slideDownButton`).disabled = true;
        document.getElementById(`slideDownButton`).style.opacity = 0.3;
    } else {
        document.getElementById(`slideDownButton`).disabled = false;
    }
}


function slideDown(i) {
    i--;
    loadPokeInfo(i);
}


function slideUp(i) {
    i++;
    loadPokeInfo(i);
}


function closePokeInfo() {
    document.body.style.overflow = 'auto';
    document.getElementById('pokeInfo_bg').classList.add('d-none');
    document.getElementById('groupFilter').classList.add('d-none');
    document.getElementById('pokeInfo').classList.add('d-none');
    document.getElementById('showMoreButton').classList.remove('d-none');
}


function openQuestionMarkInfo() {
    document.getElementById('questionMarkInfo').classList.remove('d-none');
    document.getElementById('questionmark').setAttribute('onclick', `javascript: closeQuestionMarkInfo()`);
}


function closeQuestionMarkInfo() {
    document.getElementById('questionMarkInfo').classList.add('d-none');
    document.getElementById('questionmark').setAttribute('onclick', `javascript: openQuestionMarkInfo()`);
}


function displayFilter() {
    document.body.style.overflow = 'hidden';
    document.getElementById('pokeInfo_bg').classList.remove('d-none');
    document.getElementById('groupFilter').classList.remove('d-none');
    document.getElementById('groups').innerHTML = '';

    for (let i = 0; i < allTypes.length; i++) {
        let type = allTypes[i];
        document.getElementById('groups').innerHTML += filterButton(i, type);
    }
}


function initFilter(i) {
    document.getElementById("loaderImg").style.display = "block";
    document.getElementById("pokedex").style.display = "none";
    document.getElementById('showMoreButton').classList.add('d-none');
    closeFilter();
    loadFilterPage(i);
}


function initFilterFromInfo(i) {
    ;
    document.getElementById("loaderImg").style.display = "block";
    document.getElementById("pokedex").style.display = "none";
    document.getElementById('showMoreButton').classList.add('d-none');
    closeFilter();
    loadFilterPageFromInfo(i);
}


function loadFilterPage(i) {
    let selectedGroup = allTypes[i];
    filterGroups(selectedGroup);
    setTimeout(showFilterPage, 5000);
}


function loadFilterPageFromInfo(i) {
    let selectedGroup = document.getElementById(`pokeInfoType${i}`).innerText;
    filterGroups(selectedGroup);
    setTimeout(showFilterPage, 5000);
}


function showFilterPage() {
    document.getElementById("loaderImg").style.display = "none";
    document.getElementById("pokedex").style.display = "flex";
}


function filterGroups(selectedGroup) {
    filter = [];

    for (let j = 0; j < allPokemon.length; j++) {
        currentPokemon = allPokemon[j];
        let types = currentPokemon['types'];

        for (let k = 0; k < types.length; k++) {
            if (selectedGroup == types[k]['type']['name']) {
                filter.push(currentPokemon);
            }
        }
    }
    showFilter();
}


function showFilter() {
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    for (let j = 0; j < filter.length; j++) {
        currentPokemon = filter[j];
        let i = currentPokemon['id'];
        pokedex.innerHTML += showPokecard(i);
        designCard(i);
    }
}


function closeFilter() {
    document.body.style.overflow = 'auto';
    document.getElementById('pokeInfo_bg').classList.add('d-none');
    document.getElementById('groupFilter').classList.add('d-none');
    document.getElementById('pokeInfo').classList.add('d-none');
    window.scrollTo(0, 0);
}


function showSearchbar() {
    document.getElementById('input').style.width = '200px';
    document.getElementById('input').style.transform = 'scaleX(1)';
    document.getElementById('searchButton').src = "./img/icon/x-mark.ico"
    document.getElementById('searchButton').setAttribute('onclick', `javascript: hideSearchbar()`);
}


function hideSearchbar() {
    document.getElementById('input').value = '';
    document.getElementById('input').style.width = '0px';
    document.getElementById('input').style.transform = 'scaleX(0.0)';
    document.getElementById('searchButton').src = "./img/icon/search.ico"
    document.getElementById('searchButton').setAttribute('onclick', `javascript: showSearchbar()`);
    search();
}


function search() {
    document.getElementById('pokedex').innerHTML = '<p id ="searchdialog">type at least two characters</p>';
    document.getElementById('showMoreButton').classList.add('d-none');
    let input = document.getElementById('input');
    let search = input.value.toLocaleLowerCase();

    if (search.length >= 2) {
        document.getElementById('pokedex').innerHTML = '';
        loadSearchResult(search);
    } if (search.length == 0) {
        document.getElementById('pokedex').innerHTML = '';
        homescreen();
    }
}


function loadSearchResult(search) {
    currentPokemon = [];
    window.scrollTo(0, 0);

    for (j = 0; j < allPokemon.length; j++) {
        let filterName = allPokemon[j]['name'];

        if (filterName.toLowerCase().includes(search)) {
            currentPokemon = allPokemon[j];
            let i = currentPokemon['id'];
            pokedex.innerHTML += showPokecard(i);
            designCard(i);
        }
    }
}

function showGeneralInfo() {
    document.getElementById('generalInfo').style.display = 'flex';
    document.getElementById('generalInfoButton').style.backgroundColor = 'lightgrey';
    document.getElementById('generalInfoButton').style.color = 'black';
    document.getElementById('generalInfoButton').setAttribute('onclick', `javascript: closeGeneralInfo()`);
    closeInfoDetails();
}

function closeGeneralInfo() {
    document.getElementById('generalInfo').style.display = 'none';
    document.getElementById('generalInfoButton').style.backgroundColor = 'unset';
    document.getElementById('generalInfoButton').style.color = 'white';
    document.getElementById('generalInfoButton').setAttribute('onclick', `javascript: showGeneralInfo()`);
}

function showInfoDetails() {
    document.getElementById('infoDetails').style.display = 'flex';
    document.getElementById('infoDetailsButton').style.backgroundColor = 'lightgrey';
    document.getElementById('infoDetailsButton').style.color = 'black';
    document.getElementById('infoDetailsButton').setAttribute('onclick', `javascript: closeInfoDetails()`);
    closeGeneralInfo();
}


function closeInfoDetails() {
    document.getElementById('infoDetails').style.display = 'none';
    document.getElementById('infoDetailsButton').style.backgroundColor = 'unset';
    document.getElementById('infoDetailsButton').style.color = 'white';
    document.getElementById('infoDetailsButton').setAttribute('onclick', `javascript: showInfoDetails()`);
}

function doNotClose(event) {
    event.stopPropagation();
}


window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        document.getElementById('slideUpButton').click();
    }
    if (event.keyCode == 37) {
        document.getElementById('slideDownButton').click();
    }
    if(event.keyCode == 27){
        document.getElementById('closeInfo').click();
    }
});
