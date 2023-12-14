
  let currentId;
  let pokeImagem = document.querySelector('#pkmn');
  let pkmName = document.querySelector('#pokeName');
  let pkId= document.querySelector('#numberPoke');
  let pkType = document.querySelector('#pokeType');
  let pkType2 = document.querySelector('#pokeType2');
  let pkWeight = document.querySelector('#weight');
  let inputBusca = document.querySelector('.inputBuscar');


  async function buscarEMostrarPokemons() {
    try{
    
    let containerPokemon = document.querySelector('.container-pokemons');
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
    const data = await response.json();
  
      data.results.forEach(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      const pokemonElement = document.createElement('li');
      pokemonElement.classList.add('pokemon__lista', 'card', 'align-items-center', 'text-center', 'd-flex', 'col-4', 'm-2', 'shadow');
      pokemonElement.innerHTML = `
          <div class="descricao-pokemon">
          
            <p>ID: ${pokemonData.id}</p>
            <p>Name: <span class= "pokemon-name">${pokemonData.name}</span></p>
            <img class="img-pokemon img-fluid" src="${pokemonData.sprites.front_default}" alt="imagem pokemon">
            <p class= "pokemon-type">Type: ${pokemonData.types.map(typePoke => typePoke.type.name)}
          </div>
        </li>
       
      `;



      containerPokemon.appendChild(pokemonElement);

      
      pokemonElement.addEventListener('click', () => {
        const pokemonClicado = pokemonData.name; 
        const idPokemonClicado = pokemonData.id; 
        const pokemonTypes = pokemonData.types.map(typePoke => typePoke.type.name);
        localStorage.setItem('namePokemon', pokemonClicado);
        localStorage.setItem('idPokemon', idPokemonClicado)
        localStorage.setItem('typePokemon', pokemonTypes); // verificar se vai ser util ter  o pokemonType salvo no id para  a janela de detalhes com o Giovane
        window.location.href = 'pokemonDetalhes.html';


    });


  });
  }catch(error){
    pokemonElement.innerHTML += `<p> Houve um erro ao carregar os pokemons: ${error}</p>`
  }


}

buscarEMostrarPokemons();
  
function capturarInformacoes() {
  
  let valorForm = document.querySelector('.form-control').value;
 let  pokeIdName =  valorForm;


   
  localStorage.setItem('namePokemon', pokeIdName);
  window.location.href = 'pokemonDetalhes.html';
}

inputBusca.addEventListener('click', (e) => {
  e.preventDefault();
  capturarInformacoes();
});



