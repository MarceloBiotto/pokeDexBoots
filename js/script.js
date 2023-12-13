
  // const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
  let currentId;
  let pokeImagem = document.querySelector('#pkmn');
  let pkmName = document.querySelector('#pokeName');
  let pkId= document.querySelector('#numberPoke');
  let pkType = document.querySelector('#pokeType');
  let pkType2 = document.querySelector('#pokeType2');
  let pkWeight = document.querySelector('#weight');
  // const inputSearch = document.querySelector('.form-control');
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
  

  
  
  
  //função para detalhes do pokemon especifico
  
   

    async function pokeInfo(){
    const pokemonGerado =   localStorage.getItem('namePokemon');
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonGerado}`);  
    const poke = await response.json();



 
 
    pkmName.innerHTML = poke.name;
    pokeImagem.src = poke.sprites.front_default;
    pkId.innerHTML = poke.id;
    pkWeight.innerHTML = poke.weight;
    pkType.innerHTML = poke.types.map(typePoke => typePoke.type.name);
    // pkType2.innerHTML = poke.types[1].type.name;
 
 
 
   }

   pokeInfo();
 


async function pokeUpdate() {

    const responseUptade = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
    const pokeUptadeAtribute = await responseUptade.json();

    pkmName.innerHTML = pokeUptadeAtribute.name;
    pokeImagem.src = pokeUptadeAtribute.sprites.front_default;
    pkId.innerHTML = pokeUptadeAtribute.id;
    pkWeight.innerHTML = pokeUptadeAtribute.weight;
    pkType.innerHTML = pokeUptadeAtribute.types[0].type.name;
    pkType2.innerHTML = pokeUptadeAtribute.types[1].type.name;

  } 
let idPokemonGerado =   localStorage.getItem('idPokemon');
document.addEventListener("DOMContentLoaded", () => {
  const previousButton = document.getElementById("previous-btn");
  const nextButton = document.getElementById("next-btn");

  previousButton.addEventListener("click", async () => {
    if (currentId > 1) {
      currentId--;
      
      await pokeUpdate();
    }
  });

  nextButton.addEventListener("click", async () => {
    currentId++;
    
    await pokeUpdate();
  });

  
  currentId = idPokemonGerado;
  pokeUpdate();  
});



function buscarPokemon() {
  const nomePoke = document.querySelector('.form-control').value.toLowerCase();
 
  localStorage.setItem('namePokemon', nomePoke);
  window.location.href = 'pokemonDetalhes.html';
}

inputBusca.addEventListener('submit', (e) => {
  e.preventDefault();
  buscarPokemon();
});




// // nosso map ainda não funciona, verificar metodos para faze-lo funcionar , visto na aula o metodo switch que tambem poderia ser usado
// const types = [
//   normal,fire,water,fighting,flying,grass,poison,electric,ground,psychic,rock,ice,bug,dragon,ghost,dark,steel,fairy];
//   const filterPokemonType = types.map((type, tipo)=>{
//     if(tipo == 'fire'){

//       console.log('eu sou fogo!!');
//       return type;
//     }
//   });
// console.log(types);

// function pintaCard(){
//   const cards = document.querySelector('.pokemon__lista')
//   if(tipoPokemon.includes("fire")){
//     cards.style.backgroundColor= 'red';
//   }
// }     
