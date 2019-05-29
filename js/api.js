
// Atributos DOM
var btnPesquisar = document.querySelector('#pesquisar-pokemon');
var btnGerar = document.querySelector('#gerar-pokemon');
var campo = document.querySelector('#campo-nome');

// Atributos API
var xhr = new XMLHttpRequest();
var url;


// Atributos Tipos
var tipos = buscarTodosTipos();
var EnumTipos = {
    normal: { index: 0, color: '#c0ca33' },
    fighting: { index: 1, color: '#e65100' },
    flying: { index: 2, color: '#bbdefb' },
    poison: { index: 3, color: '#9c27b0' },
    ground: { index: 4, color: '#827717' },
    rock: { index: 5, color: '#a1887f' },
    bug: { index: 6, color: '#e6ee9c' },
    ghost: { index: 7, color: '#d500f9' },
    steel: { index: 8, color: '#607d8b' },
    fire: { index: 9, color: '#f44336' },
    water: { index: 10, color: '#1565c0' },
    grass: { index: 11, color: '#4caf50' },
    electric: { index: 12, color: '#ffeb3b' },
    psychic: { index: 13, color: '#f06292' },
    ice: { index: 14, color: '#b2ebf2' },
    dragon: { index: 15, color: '#311b92' },
    dark: { index: 16, color: '#424242 ' },
    fairy: { index: 17, color: '#ef9a9a' },
    unknown: { index: 18, color: '#ffffff' },
    shadow: { index: 19, color: '#9fa8da' },
};

console.log(EnumTipos.dark);
console.log(EnumTipos.dark.index);
console.log(EnumTipos.dark.color);


campo.addEventListener('input', () => {
    var output = document.querySelector('#output-campo-nome');
    output.textContent = 'Você está pesquisando por: ' + campo.value;
});

// METODOS DE PESQUISA E GERAÇÃO DE OBJETOS
btnPesquisar.addEventListener('click', () => {
    if (event) event.preventDefault();

    url = 'https://pokeapi.co/api/v2/pokemon/' + campo.value.toLowerCase() + '/';
    xhr.open('GET', url);
    console.log(url);

    xhr.onload = () => {

        console.log('BUSCA FEITA: ', xhr.status);
        let pokemon;

        if (xhr.status == 200) {
            console.log('SUCESSO: status - ', xhr.status);
            pokemon = JSON.parse(xhr.responseText);
            console.log(pokemon);

            mudarFoto(pokemon);
            mudarCampos(pokemon);

        } else {
            M.toast({ html: 'Pokemon não Encontrado', classes: 'rounded' });
        }
    };
    xhr.send();
});

btnGerar.addEventListener('click', () => {
    if (event) event.preventDefault();

    var id = Math.floor((Math.random() * 808));
    url = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';
    xhr.open('GET', url);

    xhr.onload = () => {

        console.log('BUSCA FEITA: ', xhr.status);
        let pokemon;

        if (xhr.status == 200) {
            console.log('SUCESSO: status - ', xhr.status);
            pokemon = JSON.parse(xhr.responseText);
            console.log(pokemon);

            mudarFoto(pokemon);
            mudarCampos(pokemon);

        } else {
            console.log("deu erro");
        }
    };
    xhr.send();
});

// FIM METODOS DE CRIAÇÃO

// METODOS DE MANIPULAÇÃO DO DOM
function mudarFoto(pokemon) {
    var imagem = document.querySelector('#poke-imagem');
    imagem.src = pokemon.sprites.front_default;
}

function mudarCampos(pokemon){
    var nomePoke = document.querySelector('#nome-poke');
    var numeroPoke = document.querySelector('#numero-poke');
    var tipoPoke = document.querySelector('#tipo-poke');
    var idPoke = document.querySelector('#id-poke');
    var pesoPoke = document.querySelector('#peso-poke');

    nomePoke.textContent = pokemon.name;
    numeroPoke.textContent = 'Numero Pokedex: ' + pokemon.order;
    idPoke.textContent = 'Identificador: ' + pokemon.id;
    pesoPoke.textContent = 'Peso: ' + pokemon.weight;
}
// FIM MÉTODOS DE MANIPULAÇÃO

function buscarTodosTipos() {

    let url = 'https://pokeapi.co/api/v2/type/';
    let tipos;
    let listaTipos = [];

    xhr.open('GET', url);
    xhr.onload = () => {

        if (xhr.status == 200) {
            tipos = JSON.parse(xhr.responseText);

            //Recuperando tipos
            tipos.results.forEach(tipo => {
                listaTipos.push(tipo.name);
            });

        } else {
            console.log("erro ao buscar os tipos");
        }
    };
    xhr.send();
    return listaTipos;
}
