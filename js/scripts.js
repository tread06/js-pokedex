let pokemonRepository = (function () {
    
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let modalContainer = document.querySelector('#modal-container');    
    let dialogPromiseReject = null;

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
        let button = document.createElement("button");
        const capitalizedName =  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.innerText = capitalizedName;
        button.classList.add("pokemon-list__button");
        listItem.appendChild(button);
        listParent.appendChild(listItem);
        addPokemonClickListener(button, pokemon);
    }
    function showDetailsEvent() {
        loadDetails(this).then(function (pokemon) {
        const height = 'Height: '+pokemon.height;
        const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        showModal(capitalizedName, height, pokemon.sprites.front_default);
        });
    }
    function addPokemonClickListener(button, pokemon) {
        button.addEventListener("pointerup", showDetailsEvent.bind(pokemon));
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

    function showModal(title, text, imageUrl) {

        //remove all html inside modal container
        modalContainer.innerHTML = '';
    
        //create modal
        let modal = document.createElement('div');
        modal.classList.add('modal');    
        
        //close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('pointerdown', hideModal);
    
        //name
        let nameElement = document.createElement('h1');
        nameElement.classList.add('modal__name');
        nameElement.innerText = title;
    
        //height
        let heightElement = document.createElement('p');
        heightElement.classList.add('modal__height');
        heightElement.innerText = text;

        //image
        let imageElement = document.createElement('img');
        imageElement.classList.add('modal__image');
        imageElement.src = imageUrl;
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);
    
        //make modal visible
        modalContainer.classList.add('is-visible');
    }

    function hideModal() {       
        modalContainer.classList.remove('is-visible');

        //if there is a promise, reject
        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }
    function showDialog(title, text, imageUrl) {

        //assign title and content text and show
        showModal(title, text, imageUrl);
    
        //add additional buttons
        let modal = modalContainer.querySelector('.modal');

        //confirm
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';
    
        //cancel
        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';
    
        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);
    
        //focus on confirm
        confirmButton.focus();

        //return a promise where confirm returns resolve and cancel returns reject
        return new Promise((resolve, reject) => {
            
            cancelButton.addEventListener('pointerdown', () => {
                hideModal();
            });
            confirmButton.addEventListener('pointerdown', () => {
                //on confirm click, reset dialogPromiseReject so it doesn't get called in hideModal()
                dialogPromiseReject = null;
                hideModal();
                resolve();
            });
            
            //assign reject to a variable when the promise is created so it gets call in hideModal()
            dialogPromiseReject = reject;
        });
    }
    
    //add show modal test button event
    document.querySelector('#show-modal').addEventListener('pointerdown', () => { 
        showModal('title', 'content');
    });

    //add how dialog test button event    
    document.querySelector('#show-dialog').addEventListener('pointerdown', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
            alert('confirmed!');
        }, () => {
            alert('not confirmed');
        });
    });

    //bind close modal to escape key
    window.addEventListener('keydown', (e) => {       
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
        }   
    });  
    //close window if click outside of content
    modalContainer.addEventListener('pointerdown', (e) => {        
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

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


