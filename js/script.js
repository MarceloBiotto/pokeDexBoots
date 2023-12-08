
  // const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
  async function pokeAll(){
  const apiUrl = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
 const apiConvertida =  await apiUrl.json();
 console.log(apiConvertida);
}
pokeAll();

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
 
         
 