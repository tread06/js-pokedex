
let pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){        
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    function get(name){
        return pokemonList.find(pokemon => pokemon.name === name);
    }
    function addListItem(pokemon){
        let listParent = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-list__button');        
        listItem.appendChild(button);
        listParent.appendChild(listItem);
        addPokemonClickListener(button,pokemon);
    }   
    function showDetailsEvent(){
        loadDetails(this).then(function (pokemon) {
            console.log(pokemon);
        });
    }
    function addPokemonClickListener(button, pokemon) {
        button.addEventListener('click', showDetailsEvent.bind(pokemon));
    } 
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }   
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {            
            return response.json();
        }).then(function (details) {            
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            return details;
        }).catch(function (e) {
            console.error(e);
        });
    }
    return{
        add:add,
        getAll:getAll,
        get:get,
        addListItem:addListItem,
        loadList:loadList,
        loadDetails:loadDetails
    };
})();

pokemonRepository.loadList().then(function() {    
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    });
});
