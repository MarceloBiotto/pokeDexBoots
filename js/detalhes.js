let pkType1 = document.querySelector('#pokeType1');
let baseHp = document.querySelector('.statHp');
let baseAtk = document.querySelector('.statAtk');
let baseDef = document.querySelector('.statDef');
let baseSpatk = document.querySelector('.statSpatk');
let baseSpDef = document.querySelector('.statSdef');
let baseSpeed = document.querySelector('.statSpeed');
let buttonStat = document.querySelector('.button__stats');
let mudaCard = document.querySelectorAll('.card-title');
let weaknessesText = document.querySelector('.textfraqueza');
let buttonFraq = document.querySelector('.button__fraqueza');
let fraquezasList = document.querySelector('.fraquezas-list');
let habilidadesPoke = document.querySelector('.habilidades');

async function updateCard(poke) {
  pkmName.innerHTML = poke.name;
  pokeImagem.src =
    poke['sprites']['versions']['generation-v']['black-white']['animated'][
      'front_default'
    ] || poke.sprites.front_default;
  if (pokeImagem.src == poke.sprites.front_default) {
    pkmImagem.style.width = '150px';
  }
  pkId.innerHTML = poke.id;
  pkWeight.innerHTML = poke.weight;
  habilidadesPoke.innerHTML = ` <p> Habilidades: ${poke.abilities.map((abilityPoke) => abilityPoke.ability.name)};`
  let listaStatsAtributes = poke.stats.map((statsPoke) => statsPoke.base_stat);

  let hpConvertidoUptade = listaStatsAtributes[0];
  let atakConvertidoUptade = listaStatsAtributes[1];
  let defConvertidoUptade = listaStatsAtributes[2];
  let spatkConvertidoUptade = listaStatsAtributes[3];
  let spdefConvertidoUptade = listaStatsAtributes[4];
  let speedConvertidoUptade = listaStatsAtributes[5];

  baseHp.innerHTML = hpConvertidoUptade;
  baseAtk.innerHTML = atakConvertidoUptade;
  baseDef.innerHTML = defConvertidoUptade;
  baseSpatk.innerHTML = spatkConvertidoUptade;
  baseSpDef.innerHTML = spdefConvertidoUptade;
  baseSpeed.innerHTML = speedConvertidoUptade;

  pkType1.innerHTML = poke.types.map((typePoke) => typePoke.type.name).join(', ');

  localStorage.setItem('idPokemon', pkId);

  await showWeaknesses(poke);
}

async function pokeInfo() {
  try{
  const pokemonGerado = localStorage.getItem('idPokemon');
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonGerado}`);
  const poke = await response.json();

  pkmName.innerHTML += poke.name;
  pokeImagem.src =
    poke['sprites']['versions']['generation-v']['black-white']['animated'][
      'front_default'
    ] || poke.sprites.front_default;
  if (pokeImagem.src == poke.sprites.front_default) {
    pkmImagem.style.width = '50%';
  }

  pkId.innerHTML += poke.id;
  pkWeight.innerHTML += poke.weight;
  pkType1.innerHTML += poke.types.map((typePoke) => typePoke.type.name);

  let listaStats = poke.stats.map((statsPoke) => statsPoke.base_stat);
  let hpConvertido = listaStats[0];
  let atkConvertido = listaStats[1];
  let defConvertido = listaStats[2];
  let spAtkConvertido = listaStats[3];
  let spDefConvertido = listaStats[4];
  let speedConvertido = listaStats[5];

  baseHp.innerHTML += hpConvertido;
  baseAtk.innerHTML += atkConvertido;
  baseDef.innerHTML += defConvertido;
  baseSpatk.innerHTML += spAtkConvertido;
  baseSpDef.innerHTML += spDefConvertido;
  baseSpeed.innerHTML += speedConvertido;

  buttonStat.addEventListener('click', async(e) => {
    e.preventDefault();
    mudaCard.forEach((card) => {
      card.classList.toggle('hidden');
      if(habilidadesPoke.classList.contains('hidden')){
        habilidadesPoke.classList.remove('hidden');
      }else if(fraquezasList.classList.contains('hidden')){
        fraquezasList.classList.remove('hidden');
      }
      
    });
  });

  buttonFraq.addEventListener('click', async (e) => {
    e.preventDefault();
    mudaCard.forEach((card) => {
      card.classList.toggle('hidden2');
      habilidadesPoke.innerHTML =` <p> Habilidades: ${poke.abilities.map((abilityPoke) => abilityPoke.ability.name)};`
      if(fraquezasList.classList.contains('hidden')){
        fraquezasList.classList.remove('hidden');
      } 
    });

    await showWeaknesses(poke);
  });
}catch(error){
  console.log(`Não foi possivel acessar as informações do pokemon ${error}`)
}
}
async function showWeaknesses(poke) {

  await fraquezas(poke);
  fraquezasList.innerHTML = '';

  if (localStorage.getItem('fraqueza')) {
    fraquezasList.innerHTML = localStorage.getItem('fraqueza');
  }
}

async function fraquezas(poke) {
  try {
    const weaknessesPromises = poke.types.map(async (type) => {
      const typeUrl = type.type.url;
      const response = await fetch(typeUrl);
      const typeDetails = await response.json();
      return typeDetails.damage_relations.double_damage_from.map((weakness) => weakness.name);
    });

    const allWeaknesses = await Promise.all(weaknessesPromises);

    

    const uniqueWeaknesses = [...new Set(allWeaknesses.flat())];

    const weaknessesText =
      uniqueWeaknesses.length > 0 ? `<p>Fraquezas:${uniqueWeaknesses.join(', ')}</p>` : '';

    localStorage.setItem('fraqueza', weaknessesText);
  } catch (error) {
    console.error('Erro ao obter fraquezas:', error);
  }
}

async function pokeUpdate() {
  try{
  const responseUptade = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
  const pokeUptadeAtribute = await responseUptade.json();
  await updateCard(pokeUptadeAtribute);
}catch(error){
  console.log(`Não foi possivel atualizar as informações do pokemon ${error}`)
}
}

let idPokemonGerado = localStorage.getItem('idPokemon');
document.addEventListener('DOMContentLoaded', () => {
  const previousButton = document.getElementById('previous-btn');
  const nextButton = document.getElementById('next-btn');

  previousButton.addEventListener('click', async () => {
    if (currentId > 1) {
      currentId--;
      await pokeUpdate();
    }
  });

  nextButton.addEventListener('click', async () => {
    currentId++;
    await pokeUpdate();
  });

  currentId = idPokemonGerado;
});
