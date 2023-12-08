
  // const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
  

  
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=10")
    .then(response => response.json())
    .then((data) => {
        // Imprime os dados brutos recebidos da PokeAPI
        console.log(data);

        // Itera sobre a lista de resultados e imprime os nomes dos pokémons
        data.results.forEach((pokemon) => {
            console.log(pokemon.name);
        });
    })
    .catch(error => console.error(error));
  
  
  
  
  
  
  
  
  
  //função para detalhes do pokemon especifico

  let pokeImagem = document.querySelector('#pkmn');
  let pkmName = document.querySelector('#pokeName');
  let pkId= document.querySelector('#numberPoke');
  let pkType = document.querySelector('#pokeType');
 
   async function pokeInfo(){
     const response = await fetch('https://pokeapi.co/api/v2/pokemon/blastoise');  
     const poke = await response.json();
     console.log(poke);
     
     // console.log(poke.name); 
     // console.log(poke.id);
     // console.log(poke.sprites.front_default);
     console.log(poke.type)
 
 
    pkmName.innerHTML = poke.name;
    pokeImagem.src = poke.sprites.front_default;
    pkId.innerHTML = poke.id;
    pkType.innerHTML = poke.types[0].type.name;

 
   }
 
   pokeInfo();
 
         
 