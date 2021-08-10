
let pokemonRepository = (function() {

    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
        {name: 'Charmander', height: 0.6, types: ['Fire']},
        {name: 'Squirtle', height: 0.5, types: ['Water']}
    ];

    function add(pokemon){
        /*check if the pokemon param contains all properties.
        if only 3 properties exist, and that they are the correct types */        
        if(typeof(pokemon) === 'object'){
            if( 
                typeof(pokemon.name) === 'string' &&
                typeof(pokemon.height) === 'number' &&
                typeof(pokemon.types) === 'object' &&
                Object.keys(pokemon).length === 3
            ){
                pokemonList.push(pokemon);
            }else{
                console.warn('Pokemon is invalid. Cannot add to pokemon repository.');
            }
        }
    }
    function getAll(){
        return pokemonList;
    }
    function get(name){
        return pokemonList.find(pokemon => pokemon.name === name);
    }
    function addListItem(pokemon){
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-list__button');        
        listItem.appendChild(button);
        listParent.appendChild(listItem);
        addPokemonClickListener(button,pokemon);
    }   
    function showDetailsEvent(){
        console.log(this);
    }
    function addPokemonClickListener(button, pokemon) {
        button.addEventListener('click', showDetailsEvent.bind(pokemon));
    }    
    return{
        add:add,
        getAll:getAll,
        get:get,
        addListItem:addListItem
    };
})();

//adding a couple pokemon to test out the add function
pokemonRepository.add({name: 'Pikachu', height: 0.4, types: ['Electric']});
pokemonRepository.add({name: 'Jigglypuff', height: 0.5, types: ['Normal', 'Fairy']});

//test adding invalid pokemon
pokemonRepository.add({name: 123, height: "0.5", types: ['Normal', 'Fairy']});
pokemonRepository.add({name: "Charizard", extraParam: "invalid", height: 1.5, types: ['Fire']});
pokemonRepository.add({height: 0.4, types: ['Electric']});

let listParent = document.querySelector('.pokemon-list');
pokemonRepository.getAll().forEach( pokemon => {
    pokemonRepository.addListItem(pokemon);
});