

let pokemonRepository = (function() {

    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: ['Grass', 'Poison']},
        {name: 'Charmander', height: 0.6, types: ['Fire']},
        {name: 'Squirtle', height: 0.5, types: ['Water']},
        {name: 'Jigglypuff', height: 0.5, types: ['Normal', 'Fairy']},
        {name: 'Pikachu', height: 0.4, types: ['Electric']}
    ];
    
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    return{
        add:add,
        getAll:getAll
    };
})();

document.write('<h2>Pokemon Entries</h2>');
pokemonRepository.getAll().forEach( pokemon => {
    document.write(`<p>${pokemon.name} \(${pokemon.height}\m) `);

    //add highlight for pokemon larger than 0.5m
    if(pokemon.height > 0.5){
        document.write('Wow, That\'s big!');
    }

    //add highlight for pokemon smaller than 0.5m
    if(pokemon.height < 0.5){
        document.write('So tiny!');
    }
    document.write('</p>');
});