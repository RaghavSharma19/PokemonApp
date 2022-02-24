import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [prevpokemon, setPrevpokemon] = useState();
  const [counter, setCounter] = useState(0);
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    attack1: "",
    attack2: "",
    attack3: "",
  });
  const [pokemonSelected, setpokemonSelected] = useState(false);
  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon({
          name: response.data.forms[0].name,
          img: response.data.sprites.front_default,
          attack1: response.data.moves[0].move.name,
          attack2: response.data.moves[1].move.name,
          attack3: response.data.moves[2].move.name,
        });
        setpokemonSelected(true);
        console.log(response);
        setPrevpokemon(pokemon.name);
        setCounter(counter + 1);
      });
  };
  const searchPrevPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${prevpokemon}`)
      .then((response) => {
        setPokemon({
          name: response.data.forms[0].name,
          img: response.data.sprites.front_default,
          attack1: response.data.moves[0].move.name,
          attack2: response.data.moves[1].move.name,
          attack3: response.data.moves[2].move.name,
        });
        setpokemonSelected(true);
        setPrevpokemon(pokemon.name);
        setCounter(counter + 1);
      });
  };

  return (
    <div className="App">
      <header className="App-header">Pokemon Name</header>
      <div className="Try-field">try pikachu charizard or mewtwo</div>

      <div className="Enter-pokemon-field">
        <input
          className="input-pokemon"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        ></input>
        <button className="submit-btn" onClick={searchPokemon}>
          Submit
        </button>
      </div>

      {counter >= 2 ? (
        <div className="previous-field">
          <div className="previus-pokemon">previous pokemon</div>
          <button className="previous-btn" onClick={searchPrevPokemon}>
            {prevpokemon}
          </button>
        </div>
      ) : (
        <>
    
        </>
      )}

      <div className="Poke-card-container">
        {!pokemonSelected ? (
          <div className="pokemon-plz-search">
            <h1>Please search a Pokemon</h1>
          </div>
        ) : (
          <>
            <div>
              <img className="pokemon-img" src={pokemon.img} />
              <div className="attack-list">
                <h1>{pokemon.name}</h1>
                <ul>
                  <li>{pokemon.attack1}</li>
                  <li>{pokemon.attack2}</li>
                  <li>{pokemon.attack3}</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
