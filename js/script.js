
  let currentId;
  let pokeImagem = document.querySelector('#pkmn');
  let pkmName = document.querySelector('#pokeName');
  let pkId= document.querySelector('#numberPoke');
  let pkType2 = document.querySelector('#pokeType2');
  let pkWeight = document.querySelector('#weight');
  let inputBusca = document.querySelector('.inputBuscar');
  



  async function buscarEMostrarPokemons(contador = 20, offSet = 0 ) {
    try{
    
    let containerPokemon = document.querySelector('.container-pokemons');
 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${contador}&offset=${offSet}`)
                   
      const data = await response.json();
      const pokemons = data.results;
      for(const pokemon of pokemons){
        const pokemonData = await fetch(pokemon.url).then(response => response.json());
      const pokemonElement = document.createElement('li');

      pokemonElement.classList.add('pokemon__lista', 'card', 'align-items-center', 'text-center', 'd-flex', 'col-4', 'm-2', 'shadow', `${pokemonData.types.map(typePoke => typePoke.type.name)[0]}`);
         pokemonElement.innerHTML = `
          <div class="descricao-pokemon ">
          
            <p>ID: ${pokemonData.id}</p>
            <p>Name: <span class= "pokemon-name">${pokemonData.name}</span></p>
           <img class="img-pokemon img-fluid" src="${pokemonData.sprites.front_default}" alt="imagem pokemon">
           
            
            <p >Type: ${pokemonData.types.map(typePoke => typePoke.type.name)}
          </div>
        </li>
       
      `;
      



      await containerPokemon.appendChild(pokemonElement);

      
      pokemonElement.addEventListener('click', () => {
        const pokemonClicado = pokemonData.name; 
        const idPokemonClicado = pokemonData.id; 
        const pokemonTypes =pokemonData.types.map(typePoke => typePoke.type.name);
        localStorage.setItem('namePokemon', pokemonClicado);
        localStorage.setItem('idPokemon', idPokemonClicado)
        localStorage.setItem('typePokemon', pokemonTypes);
        window.location.href = 'pokemonDetalhes.html';


    });
      }
  
    
  }catch(error){
     console.log(`Houve um erro ao carregar os pokemons: ${error}`);
  }


}


buscarEMostrarPokemons();
  
function capturarInformacoes() {
  try{
  let valorForm = document.querySelector('.form-control').value.toLowerCase();
  let pokeIdName = valorForm;

  async function searchInfo(pokemonIdName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdName}`);
    const pokeSearch = await response.json();
    const pokeIdSearch = pokeSearch.id;

    localStorage.setItem('idPokemon', pokeIdSearch);
    window.location.href = 'pokemonDetalhes.html';
  }


  searchInfo(pokeIdName);
}catch(error){
  alert('não possivel carregar informações');
}
}
inputBusca.addEventListener('click', async (e) => {
  e.preventDefault();
  capturarInformacoes();
});


let maisPokemon = document.querySelector('.maisPoke');
let menosPokemon = document.querySelector('.menosPoke');

let contador = 0;
let offset = 0;

maisPokemon.addEventListener('click', (e) => {
  e.preventDefault();
  contador += 20;
  offset += 20;

  localStorage.setItem('pagination', offset);
  
  buscarEMostrarPokemons(contador, offset);
});

