import { useState } from 'react';
import './App.css';
import Starfield from './components/Starfield/Starfield';
import useWindowDimensions from './components/useWindowDimensions/useWindowDimensions';
import DimensionsDisplay from './components/DimensionsDisplay/DimensionsDisplay';
import StarshipList from './components/StarshipsList/StarshipList';
import StarshipSearch from './components/StarshipSearch/StarshipSearch';



function App() {
  const { width, height } = useWindowDimensions();
  const BASE_URL = `https://swapi.dev/api/`;
  const [starships, setStarships] = useState([]);
  const [search, setSearch] = useState('');

  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');


  const goToNext = async () => {
      let response = await fetch(next)
      let JSONdata = await response.json()

      setStarships(JSONdata.results);

      JSONdata.next ? setNext(JSONdata.next) : setNext('');
      JSONdata.previous ? setPrevious(JSONdata.previous) : setPrevious('');
  }

  const goToPrevious = async () => {
      let response = await fetch(previous)
      let JSONdata = await response.json()

      setStarships(JSONdata.results);

      JSONdata.next ? setNext(JSONdata.next) : setNext('');
      JSONdata.previous ? setPrevious(JSONdata.previous) : setPrevious('');
  }

  return (
    <>
      <Starfield width={width} height={height} />
      <main id="app">
        <header>
          <div className='logo'><img src="../public/empire.png" alt="" />Empire Starships</div>
        </header>
        <main>

          <StarshipSearch BASE_URL={BASE_URL} setStarships={setStarships} />

          {previous ? 
            <button onClick={() => goToPrevious()}>prev</button> :
            <button onClick={() => goToPrevious()} disabled >prev</button>
          }
          {next ? 
            <button onClick={() => goToNext()}>next</button> :
            <button onClick={() => goToNext()} disabled >next</button>
          }
          <StarshipList setNext={setNext} BASE_URL={BASE_URL} starships={starships} setStarships={setStarships} />

        </main>
        <footer>
          <DimensionsDisplay width={width} height={height} />
          &copy; 3 BBY | Galactic Empire
        </footer>

      </main>
    </>
  )
}

export default App;
