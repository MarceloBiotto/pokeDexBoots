
  let currentId;
  let pokeImagem = document.querySelector('#pkmn');
  let pkmName = document.querySelector('#pokeName');
  let pkId= document.querySelector('#numberPoke');
  let pkType2 = document.querySelector('#pokeType2');
  let pkWeight = document.querySelector('#weight');
  let inputBusca = document.querySelector('.inputBuscar');
  // let tipoPoke = document.querySelector('.pokemon-type').value;



  async function buscarEMostrarPokemons(contador = 20 , offSet = 0 ) {
    try{
    
    let containerPokemon = document.querySelector('.container-pokemons');
    // const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20"); // essa esta funcionando, estamos testando a pagination 
    // com a response a baixo;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${contador}&offset=${offSet}`)
                          .then(response => response.json())
                          .then(data => data.results)
                          .catch(error => console.error("Houve um erro na chamada da API: ", error));
  
      response.forEach(async (pokemon) => {
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
      

      // localStorage.setItem('typePokemon', pokemonTypo);
      // pintaCard();


      containerPokemon.appendChild(pokemonElement);

      
      pokemonElement.addEventListener('click', () => {
        const pokemonClicado = pokemonData.name; 
        const idPokemonClicado = pokemonData.id; 
        const pokemonTypes =pokemonData.types.map(typePoke => typePoke.type.name);
        localStorage.setItem('namePokemon', pokemonClicado);
        localStorage.setItem('idPokemon', idPokemonClicado)
        localStorage.setItem('typePokemon', pokemonTypes);
        window.location.href = 'pokemonDetalhes.html';


    });
    // console.log(tipoPoke);
  //   async function pintaCard(){
  //     let pintaCard = localStorage.getItem('typePokemon');
  //     if(pintaCard == 'fire'){
  //         pokemonElement.classList.add('.fire');
  //     }
  
  // }

  });
  }catch(error){
    pokemonElement.innerHTML += `<p> Houve um erro ao carregar os pokemons: ${error}</p>`
  }


}


buscarEMostrarPokemons();
  
function capturarInformacoes() {
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
}

inputBusca.addEventListener('click', async (e) => {
  e.preventDefault();
  capturarInformacoes();
});


let maisPokemon = document.querySelector('.maisPoke');
let contador= 0;
let menosPokemon = document.querySelector('.menosPoke');


maisPokemon.addEventListener('click', (e)=>{
  e.preventDefault();
  const offSet = localStorage.getItem('pagination');
  contador += 20;
  localStorage.setItem('pagination', contador)

  
 buscarEMostrarPokemons(contador, offSet);
 

});

