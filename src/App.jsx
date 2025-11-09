import { useEffect, useState } from 'react';
import './App.css';
import Starfield from './components/Starfield/Starfield';
import useWindowDimensions from './components/useWindowDimensions/useWindowDimensions';
import StarshipList from './components/StarshipsList/StarshipList';

function App() {
  const { width, height } = useWindowDimensions();

  const BASE_URL = `https://swapi.dev/api/`;

  const [starships, setStarships] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const getData = async () => {
      let response = await fetch(BASE_URL + `starships/`)
      let JSONdata = await response.json()

      setStarships(JSONdata.results);
    }

    getData()

  }, []);

  // const calcPrice = (starship) => {
  //     const name = starship.name;
  //     const passengers = (starship.passengers).replace(/,/g, '');
      
  //     let cost =starship.cost_in_credits;
  //     if (passengers==='n/a' || cost==='unknown') return '*call for price';
  //     // console.log('===============================================')
  //     // console.log(`name: ${name}, passengers: ${passengers}, cost: ${cost}`)

  //     const price = BigInt(cost)// * BigInt(passengers);
  //     return price.toLocaleString('en-US');
  // };

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = async (event) => {
    // Prevent automatic form submission
    event.preventDefault();

    // Get Starship Data
    let response = await fetch(BASE_URL + `starships/?search=${search}`);
    let JSONdata = await response.json();
    console.log(JSONdata.results)

    // Insert Starship Data into the DOM
    setStarships(JSONdata.results);
  }

  // const someList = starships.map(
  //   (starship, index) => {
      
  //     // const price = passengers * cost;
  //     return (<li key={index} className="card">
  //       <h2>{starship.name}</h2>
  //       <p>{starship.starship_class}</p>
  //       <p><b>Price:</b> ${calcPrice(starship)}</p>
  //       <p><b>Starship Class:</b> {starship.starship_class}</p>
  //       <p><b>Model:</b> {starship.model}</p>
  //       <p><b>Manufacturer:</b> {starship.manufacturer}</p>
  //     </li>)
  //   }
  // );

  

  return (
    <>
      <Starfield width={width} height={height} />
      <main id="app">
        <header>
          <div className='logo'><img src="../public/empire.png" alt="" />Empire Starships</div>
        </header>
        <main>

          <h1>Used Starships for Sale near Planet Coruscant</h1>
          <form onSubmit={handleSubmit}>
            Starship Search:
            <input type="text" onChange={handleChange} />
            <input type="submit" value="Show Starship" />
          </form>

          {/* { starships.length ? `${starships.length} results` : '' }
          <ul className="cards">
            { someList }
          </ul> */}

          <StarshipList starships={starships} />

          <p>Screen width: {width}px, Screen height: {height}px</p>

          <h1>MVP</h1>
          <p>As a user, I should see a list of starship cards when the site loads. The list should also indicate the number of results that are being displayed currently.</p>
          <p>As a user, I should see the name, starship class, starship manufacturer, and starship model rendered in each starship card.</p>
          <p>As a user, I should see a search bar above the list of starships. I should be able to enter in the name of a starship into the search bar, and submit my query.</p>
          <p>As a user, when I submit a search, the starship results being displayed should update based on my query</p>

        </main>
        <footer>&copy; 24,386 | Galactic Empire</footer>
      </main>
    </>
  )
}

export default App;
