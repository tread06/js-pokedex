let pokemonRepository = (function () {
    
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=898";

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function getAll() {
        return pokemonList;
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

        listItem.appendChild(button);
        listParent.appendChild(listItem);
        addPokemonClickListener(button, pokemon);
    }
    function updatePokemonModalInfo() {
        loadDetails(this).then(function (pokemon) {

            const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            //update and show bootstrap modal
            $("#pokemon-name").text(capitalizedName);
            $("#pokemon-height").text(pokemon.height);
            $("#pokemon-weight").text(pokemon.weight);
            $("#pokemon-image").attr("src", pokemon.sprites.front_default);

            //update alt text for pokemon image
            $("#pokemon-image").attr("alt", pokemon.name + " image");

            //update types
            $("#pokemon-type-01").text(pokemon.types[0].type.name);

            //replace type color class (last class)
            var lastClass_01 = $(".types__container-01").attr('class').split(' ').pop();
            $(".types__container-01").removeClass(lastClass_01);
            $(".types__container-01").addClass("type-"+pokemon.types[0].type.name);
            
            //remove invisible first to ensure that the color is the last class
            $(".types__container-02").removeClass("invisible");

            //update second type if it exists
            if(pokemon.types.length > 1)
            {
                $("#pokemon-type-02").text(pokemon.types[1].type.name); 

                var lastClass_02 = $(".types__container-02").attr('class').split(' ').pop();
                $(".types__container-02").removeClass(lastClass_02);                
                $(".types__container-02").addClass("type-"+ pokemon.types[1].type.name);
            }
            //hide second type if there is only one type
            else
            {
                $(".types__container-02").addClass("invisible");
            }
            //show modal
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

//searchable list
$(document).ready(function(){
    $("#pokemon-list-input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#pokemon-list li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


