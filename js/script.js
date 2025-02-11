const colours = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

async function loadTypes(type) {
    try {
        const response = await fetch('https://pokebuildapi.fr/api/v1/types');
        const types = await response.json();

        const typesContainer = document.getElementById('types');
        typesContainer.innerHTML = '';

        types.forEach(type => {
            const typeButton = document.createElement('div');
            typeButton.classList.add('type-button');
            typeButton.dataset.type = type.name;
            typeButton.innerHTML = `
                <img src="${type.image}" alt="${type.name}">
                <p>${type.name}</p>
            `;
            typesContainer.appendChild(typeButton);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des types :', error);
    }
}

async function loadPoke(generation, selectedType, selectedCritere) {
    try {
        const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/generation/${generation}`);
        let data = await response.json();

        console.log(data);

        if (selectedType) {
            data = data.filter(pokemon => pokemon.apiTypes.some(type => type.name === selectedType));
        }

        if(selectedCritere) {
            data = data.sort((a, b) => {
                switch(selectedCritere) {
                    case "1":
                        return a.name.localeCompare(b.name);
                    case "2":
                        return b.stats.HP - a.stats.HP;
                    case "3":
                        return b.stats.attack - a.stats.attack;
                    case "4":
                        return b.stats.defense - a.stats.defense;
                    case "5":
                        return b.stats.special_attack - a.stats.special_attack;
                    case "6":
                        return b.stats.speed - a.stats.speed;
                    default:
                        return 0;
                }
            })
        }

        const mainElement = document.querySelector('main');
        mainElement.innerHTML = '';

        data.forEach(pokemon => {
            const pokemonTypes = pokemon.apiTypes.map(type => type.name);
            if (!selectedType || pokemonTypes.includes(selectedType)) {
                const article = document.createElement('article');
                article.innerHTML = `
                <figure>
                    <picture>
                        <img src="${pokemon.image}" alt="${pokemon.name}" />
                    </picture>
                    <figcaption>
                        <span class="types">${pokemon.apiTypes[0].name}</span>
                        <h2>${pokemon.name}</h2>
                        <ol>
                            <li>Points de vie : ${pokemon.stats.HP}</li>
                            <li>Attaque : ${pokemon.stats.attack}</li>
                            <li>Défense : ${pokemon.stats.defense}</li>
                            <li>Attaque spéciale : ${pokemon.stats.special_attack}</li>
                            <li>Vitesse : ${pokemon.stats.speed}</li>
                        </ol>
                    </figcaption>
                </figure>`;

                const type = pokemon.apiTypes[0].name;
                switch (type) {
                    case "Normal":
                        article.style.backgroundColor = colours.normal;
                        article.style.borderColor = colours.normal;
                        break;
                    case "Feu":
                        article.style.backgroundColor = colours.fire;
                        article.style.borderColor = colours.fire;
                        break;
                    case "Eau":
                        article.style.backgroundColor = colours.water;
                        article.style.borderColor = colours.water;
                        break;
                    case "Électrik":
                        article.style.backgroundColor = colours.electric;
                        article.style.borderColor = colours.electric;
                        break;
                    case "Herbe":
                        article.style.backgroundColor = colours.grass;
                        article.style.borderColor = colours.grass;
                        break;
                    case "Glace":
                        article.style.backgroundColor = colours.ice;
                        article.style.borderColor = colours.ice;
                        break;
                    case "Combat":
                        article.style.backgroundColor = colours.fighting;
                        article.style.borderColor = colours.fighting;
                        break;
                    case "Poison":
                        article.style.backgroundColor = colours.poison;
                        article.style.borderColor = colours.poison;
                        break;
                    case "Plante":
                        article.style.backgroundColor = colours.ground;
                        article.style.borderColor = colours.ground;
                        break;
                    case "Vol":
                        article.style.backgroundColor = colours.flying;
                        article.style.borderColor = colours.flying;
                        break;
                    case "Psy":
                        article.style.backgroundColor = colours.psychic;
                        article.style.borderColor = colours.psychic;
                        break;
                    case "Insecte":
                        article.style.backgroundColor = colours.bug;
                        article.style.borderColor = colours.bug;
                        break;
                    case "Roche":
                        article.style.backgroundColor = colours.rock;
                        article.style.borderColor = colours.rock;
                        break;
                    case "Spectre":
                        article.style.backgroundColor = colours.ghost;
                        article.style.borderColor = colours.ghost;
                        break;
                    case "Dragon":
                        article.style.backgroundColor = colours.dragon;
                        article.style.borderColor = colours.dragon;
                        break;
                    case "Nuit":
                        article.style.backgroundColor = colours.dark;
                        article.style.borderColor = colours.dark;
                        break;
                    case "Acier":
                        article.style.backgroundColor = colours.steel;
                        article.style.borderColor = colours.steel;
                        break;
                    case "Fée":
                        article.style.backgroundColor = colours.fairy;
                        article.style.borderColor = colours.fairy;
                        break;
                    default :
                        article.style.backgroundColor = "gray";
                        article.style.borderColor = "gray";
                }

                mainElement.appendChild(article);
            }
        });
    } catch (error) {
        alert("Erreur : " + error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const generationSelect = document.querySelector('#filtre select');
    const typesContainer = document.getElementById('types');
    const critereSelect = document.querySelector('#tri select');

    let selectedGeneration = generationSelect.value;
    let selectedType = null;
    let selectedCritere = critereSelect.value;

    generationSelect.addEventListener('change', (event) => {
        selectedGeneration = event.target.value;
        console.log('Génération sélectionnée :', selectedGeneration);
        loadPoke(selectedGeneration, selectedType, selectedCritere);
    });

    critereSelect.addEventListener('change', (event) => {
        selectedCritere = event.target.value;
        console.log('Critère sélectionné :', selectedCritere);
        loadPoke(selectedGeneration, selectedType, selectedCritere);
    });


    const typeButtons = document.querySelectorAll('.type-button');

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
            } else {
                button.classList.add('selected');
            }
        });
    });

    function toggleSelection(typeButton) {
        typeButton.classList.toggle('selected');
        if (typeButton.classList.contains('selected')) {
            console.log(`Type ${typeButton.dataset.type} sélectionné`);
        } else {
            console.log(`Type ${typeButton.dataset.type} désélectionné`);
        }
    }

    typesContainer.addEventListener('click', (event) => {
        const typeButton = event.target.closest('.type-button');
        if (typeButton) {
            toggleSelection(typeButton);
            selectedType = typeButton.classList.contains('selected') ? typeButton.dataset.type : null;
            console.log('Type sélectionné :', selectedType);
            loadPoke(selectedGeneration, selectedType, selectedCritere);
        }
    });

    loadTypes();
    loadPoke(1,null,null);
});

