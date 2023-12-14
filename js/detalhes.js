async function pokeUpdate() {

    const responseUptade = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
    const pokeUptadeAtribute = await responseUptade.json();

    pkmName.innerHTML = pokeUptadeAtribute.name;
    pokeImagem.src = pokeUptadeAtribute.sprites.front_default;
    pkId.innerHTML = pokeUptadeAtribute.id;
    pkWeight.innerHTML = pokeUptadeAtribute.weight;
    pkType.innerHTML = poke.types.map(typePoke => typePoke.type.name);
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
  pokeUpdate();  
});
