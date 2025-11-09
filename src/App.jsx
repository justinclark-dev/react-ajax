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

  return (
    <>
      <Starfield width={width} height={height} />
      <main id="app">
        <header>
          <div className='logo'><img src="../public/empire.png" alt="" />Empire Starships</div>
        </header>
        <main>

          <StarshipSearch BASE_URL={BASE_URL} setStarships={setStarships} />

          <StarshipList BASE_URL={BASE_URL} starships={starships} setStarships={setStarships} />

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
