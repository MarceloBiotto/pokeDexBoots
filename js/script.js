
  // const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);

  let pokeImagem = document.querySelector('#pkmn');
  let pkmName = document.querySelector('#pokeName');
  let pkId= document.querySelector('#numberPoke');
 
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
 
   }
 
   pokeInfo();
 
         
 