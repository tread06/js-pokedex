
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
    return{
        add:add,
        getAll:getAll,
        get:get
    };
})();

//adding a couple pokemon to test out the add function
pokemonRepository.add({name: 'Pikachu', height: 0.4, types: ['Electric']});
pokemonRepository.add({name: 'Jigglypuff', height: 0.5, types: ['Normal', 'Fairy']});

//test adding invalid pokemon
pokemonRepository.add({name: 123, height: "0.5", types: ['Normal', 'Fairy']});
pokemonRepository.add({name: "Charizard", extraParam: "invalid", height: 1.5, types: ['Fire']});
pokemonRepository.add({height: 0.4, types: ['Electric']});

//moved write into a new function since it's used in two places
function writePokemon(pokemon)
{
    if(pokemon===undefined) {
        return;
    }    

    document.write(`<p>${pokemon.name} \(${pokemon.height}\m) `);

    //add text highlight for pokemon larger than 0.5m
    if(pokemon.height > 0.5){
        document.write('Wow, That\'s big!');
    }
    //add text highlight for pokemon smaller than 0.5m
    if(pokemon.height < 0.5){
        document.write('So tiny!');
    }
    document.write('</p>');
}

//write pokemon list
document.write('<h2>Pokemon Entries</h2>');
pokemonRepository.getAll().forEach( pokemon => {
    writePokemon(pokemon);
});
//write specific pokemon
document.write('<h2>Get Specific Pokemon</h2>');
writePokemon(pokemonRepository.get('Pikachu'));
writePokemon(pokemonRepository.get('Charmander'));

//test writing a specific pokemon that does not exist
writePokemon(pokemonRepository.get('Charizard'));