let pokemonRepository = (function () {
    
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    function get(name) {
        return pokemonList.find((pokemon) => pokemon.name === name);
    }
    function addListItem(pokemon) {

        let listParent = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        let button = document.createElement("button");
        const capitalizedName =  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.innerText = capitalizedName;        
        button.classList.add("btn");
        button.classList.add("btn-block");
        button.classList.add("btn-primary");

        //this functionality was moved to the updatePokemonModalInfo function
        //because the modal was appearing before the text could be updated.

        //button.setAttribute("data-toggle","modal");
        //button.setAttribute("data-target","#pokemon-modal");

        listItem.appendChild(button);
        listParent.appendChild(listItem);
        addPokemonClickListener(button, pokemon);
    }
    function updatePokemonModalInfo() {
        loadDetails(this).then(function (pokemon) {

            const height = 'Height: '+pokemon.height;
            const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            //update and show bootstrap modal
            $("#pokemon-name").text(capitalizedName);
            $("#pokemon-height").text(height);
            $("#pokemon-image").attr("src", pokemon.sprites.front_default);
            $("#pokemon-modal").modal('show');

        });
    }
    function addPokemonClickListener(button, pokemon) {
        button.addEventListener("pointerup", updatePokemonModalInfo.bind(pokemon));
    }
    function loadList() {
        return fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url,
            };
            add(pokemon);
            });
        })
        .catch(function (e) {
            console.error(e);
        });
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (details) {
            return details;
        })
        .catch(function (e) {
            console.error(e);
        });
    }
    return {
        add: add,
        getAll: getAll,
        get: get,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

//load and populate pokemon list
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


