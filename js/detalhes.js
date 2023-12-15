let pkType1 = document.querySelector('#pokeType1');
let hp = document.querySelector('#statsHp');
let atk = document.querySelector('#statsAtk');
 
async function pokeInfo(){
    const pokemonGerado =   localStorage.getItem('idPokemon');
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonGerado}`);  
    const poke = await response.json();
   



    
    pkmName.innerHTML = poke.name;
    pokeImagem.src = poke['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pkId.innerHTML = poke.id;
    pkWeight.innerHTML = poke.weight;
    pkType1.innerHTML = poke.types.map(typePoke => typePoke.type.name);
    // hp.innerHTML += poke.stats.map(statsPoke => statsPoke.base_stat)[0];
    // atk.innerHTML += poke.stats.map(statsPoke => statsPoke.base_stat)[1];
    let listaStats =poke.stats.map(statsPoke => statsPoke.base_stat);
    atk.innerHTML = listaStats;
    console.log(listaStats)


   }

  //  pokeInfo();



   async function pokeUpdate() {
    const responseUptade = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
    const pokeUptadeAtribute = await responseUptade.json();

    pkmName.innerHTML = pokeUptadeAtribute.name;
    pokeImagem.src = pokeUptadeAtribute['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pkId.innerHTML = pokeUptadeAtribute.id;
    pkWeight.innerHTML = pokeUptadeAtribute.weight;
    let listaStatsAtributes =pokeUptadeAtribute.stats.map(statsPoke => statsPoke.base_stat);
    atk.innerHTML = listaStatsAtributes;
    console.log(listaStats)
    
    pkType1.innerHTML = pokeUptadeAtribute.types.map(typePoke => typePoke.type.name).join(', ');
  

    localStorage.setItem('idPokemon', pkId);
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
 
});
