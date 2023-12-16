let pkType1 = document.querySelector('#pokeType1');
let baseHp = document.querySelector('.statHp');
let baseAtk = document.querySelector('.statAtk');
let baseDef = document.querySelector('.statDef')
let baseSpatk = document.querySelector('.statSpatk')
let baseSpDef = document.querySelector('.statSdef')
let baseSpeed = document.querySelector('.statSpeed');
let buttonStat = document.querySelector('.button__stats');
let mudaCard = document.querySelectorAll('.card-title');

async function pokeInfo(){
    const pokemonGerado =   localStorage.getItem('idPokemon');
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonGerado}`);  
    const poke = await response.json();
   




    pkmName.innerHTML += poke.name;
    pokeImagem.src = poke['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] || poke.sprites.front_default;
    if(pokeImagem.src == poke.sprites.front_default){ // verificar essa logica
      pkmImagem.style.width =  "50%";
    }

    pkId.innerHTML += poke.id;
    pkWeight.innerHTML += poke.weight;
    pkType1.innerHTML += poke.types.map(typePoke => typePoke.type.name);
    // hp.innerHTML += poke.stats.map(statsPoke => statsPoke.base_stat)[0];
    // atk.innerHTML += poke.stats.map(statsPoke => statsPoke.base_stat)[1];
    let listaStats =poke.stats.map(statsPoke => statsPoke.base_stat);
    console.log("eu sou a universal: " ,listaStats[3])
    let hpConvertido = listaStats[0];
    let atkConvertido = listaStats[1];
    let defConvertido = listaStats[2];
    let spAtkConvertido = listaStats[3];
    let spDefConvertido = listaStats[4];
    let speedConvertido = listaStats[5];

    console.log('aqui esta meu hp: ', hpConvertido)

    baseHp.innerHTML += hpConvertido;
    baseAtk.innerHTML += atkConvertido;
    baseDef.innerHTML += defConvertido
    baseSpatk.innerHTML += spAtkConvertido;
    baseSpDef.innerHTML += spDefConvertido;
    baseSpeed.innerHTML += speedConvertido;

    buttonStat.addEventListener('click', (e) => {
      e.preventDefault();
      mudaCard.forEach(card => {
        card.classList.toggle('hidden');
      });
    });
   




;

    
   }

  //  pokeInfo();



   async function pokeUpdate() {
    const responseUptade = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
    const pokeUptadeAtribute = await responseUptade.json();


    pkmName.innerHTML = pokeUptadeAtribute.name;
    pokeImagem.src = pokeUptadeAtribute['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] ||  pokeUptadeAtribute.sprites.front_default;
    let pkmImagem= document.querySelector('#pkmn');
    if(pokeImagem.src == pokeUptadeAtribute.sprites.front_default){
      pkmImagem.style.width =  "150px"; // verificar essa logica
    }
    pkId.innerHTML = pokeUptadeAtribute.id;
    pkWeight.innerHTML = pokeUptadeAtribute.weight;

    

    let listaStatsAtributes =pokeUptadeAtribute.stats.map(statsPoke => statsPoke.base_stat); //aqui esta a lista para não perde-la

    let  hpConvertidoUptade = listaStatsAtributes[0];
    let  atakConvertidoUptade = listaStatsAtributes[1];
    let  defConvertidoUptade = listaStatsAtributes[2];
    let  spatkConvertidoUptade = listaStatsAtributes[3];
    let  spdefConvertidoUptade = listaStatsAtributes[4];
    let  speedConvertidoUptade = listaStatsAtributes[5];

    baseHp.innerHTML = hpConvertidoUptade;
    baseAtk.innerHTML = atakConvertidoUptade;
    baseDef.innerHTML = defConvertidoUptade;
    baseSpatk.innerHTML = spatkConvertidoUptade;
    baseSpDef.innerHTML = spdefConvertidoUptade;
    baseSpeed.innerHTML =  speedConvertidoUptade;

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
