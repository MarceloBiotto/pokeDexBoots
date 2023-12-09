
  // const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
  
  let pokeImagem = document.querySelector('#pkmn');
  let pkmName = document.querySelector('#pokeName');
  let pkId= document.querySelector('#numberPoke');
  let pkType = document.querySelector('#pokeType');
  let  pkWeight = document.querySelector('#weight')

  

  async function buscarEMostrarPokemons() {
    try{
    let capturaName = document.querySelector('.descricao-pokemon');
    console.log(capturaName.name);
    let containerPokemon = document.querySelector('.container-pokemons');
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
    const data = await response.json();
  
    data.results.forEach(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
    
      containerPokemon.innerHTML += `
       
        <li class=" pokemon__lista card align-items-center text-center d-flex col-4 m-2">
          <div class="descricao-pokemon ">
          
            <p>ID: ${pokemonData.id}</p>
            <p>Name: ${pokemonData.name}</p>
            <img class="img-pokemon img-fluid" src="${pokemonData.sprites.front_default}" alt="imagem pokemon">
            <p>Type: ${pokemonData.types[0].type.name}
          </div>
        </li>
       
      `;

      
     capturaName.addEventListener('click', ()=>{
      localStorage.setItem('namePokemon', `${pokemonData.name}`);
     })

    })
  }catch(error){
      containerPokemon.innerHTML += `<p> Houve um erro ao carregar os pokemons: ${error}</p>`
  }
}
  
  buscarEMostrarPokemons();
  
  
  
  
  
  
  //função para detalhes do pokemon especifico

 
   async function pokeInfo(){
     const response = await fetch('https://pokeapi.co/api/v2/pokemon/blastoise');  
     const poke = await response.json();
     console.log(poke);
     

     // console.log(poke.name); 
     // console.log(poke.id);
     // console.log(poke.sprites.front_default);

 
 
    pkmName.innerHTML = poke.name;
    pokeImagem.src = poke.sprites.front_default;
    pkId.innerHTML = poke.id;
    pkType.innerHTML = poke.types[0].type.name;
    pkWeight.innerHTML = poke.weight;

 
 
   }


 
   pokeInfo();
 
         
 