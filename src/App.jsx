import { useState } from 'react';
import './App.css';
import Starfield from './components/Starfield/Starfield';
import useWindowDimensions from './components/useWindowDimensions/useWindowDimensions';
import DimensionsDisplay from './components/DimensionsDisplay/DimensionsDisplay';
import StarshipList from './components/StarshipsList/StarshipList';
import StarshipSearch from './components/StarshipSearch/StarshipSearch';
import NextPreviousButtons from './components/NextPreviousButtons/NextPreviousButton';

function App() {
  const { width, height } = useWindowDimensions();
  const BASE_URL = `https://swapi.dev/api/`;
  const [starships, setStarships] = useState([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [resultsCounts, setResultsCounts] = useState('');

  return (
    <>
      <Starfield width={width} height={height} />

      <main id="app">
        <header>
          <div className='logo'>
            <img src="../public/empire.png" alt="" />
            &nbsp;
            Empire Starships
          </div>
        </header>
        <main>

          <StarshipSearch
            BASE_URL={BASE_URL}
            setStarships={setStarships}
            setResultsCounts={setResultsCounts}
            setNext={setNext}
            setPrevious={setPrevious}
          />

          <NextPreviousButtons
            next={next}
            previous={previous}
            setStarships={setStarships}
            setNext={setNext}
            setPrevious={setPrevious}
            resultsCounts={resultsCounts}
            setResultsCounts={setResultsCounts}
          />

          <StarshipList
            setNext={setNext}
            BASE_URL={BASE_URL}
            starships={starships}
            setStarships={setStarships}
            setResultsCounts={setResultsCounts}
          />

        </main>
        <footer>
          &copy; 3 BBY | Galactic Empire
          <DimensionsDisplay width={width} height={height} />
        </footer>

      </main>
    </>
  )
}

export default App;