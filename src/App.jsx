import { useEffect, useState } from 'react';
import './App.css';
import Starfield from './components/Starfield/Starfield';
import useWindowDimensions from './components/useWindowDimensions/useWindowDimensions';


function App() {
  const [count, setCount] = useState(0);
  const { width, height } = useWindowDimensions();


  const BASE_URL = `https://swapi.dev/api/`;

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(BASE_URL + `starships/9/`)
      let JSONdata = await response.json()

      console.log(JSONdata)

      // JSONdata.map(() => {});
      setLocation(JSONdata.name)
      setTemperature(JSONdata.model)
      setConditions(JSONdata.manufacturer)
    }

    getData()

  }, []);

  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState('');
  const [conditions, setConditions] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  }

  const handleSubmit = async (event) => {
    // Prevent automatic form submission
    event.preventDefault();

    // Get Weather Data

    let response = await fetch(BASE_URL + `${city}`);
    let JSONdata = await response.json();
    console.log(JSONdata)

    // Insert Weather Data into the DOM
    setLocation(JSONdata.location.name)
    setTemperature(JSONdata.current.temp_f)
    setConditions(JSONdata.current.condition.text)
  }


  return (
    <>
      <Starfield width={width} height={height} />
      <main id="app">
        <header>Header</header>
        <main>

          <h1>Hello Galaxy!</h1>
          <form onSubmit={handleSubmit}>
            Please enter your city name for the weather:
            <input type="text" onChange={handleChange} />
            <input type="submit" value="Get my forecast!" />
          </form>

          <div className="card">
            <h2> Here's Your Weather Report:</h2>
            <p>Location: {location}</p>
            <p>Temperature: {temperature}</p>
            <p>Conditions: {conditions}</p>
          </div>
          <p>Screen width: {width}px</p>
          <p>Screen height: {height}px</p>

          <h1>MVP</h1>
          <p>As a user, I should see a list of starship cards when the site loads. The list should also indicate the number of results that are being displayed currently.</p>
          <p>As a user, I should see the name, starship class, starship manufacturer, and starship model rendered in each starship card.</p>
          <p>As a user, I should see a search bar above the list of starships. I should be able to enter in the name of a starship into the search bar, and submit my query.</p>
          <p>As a user, when I submit a search, the starship results being displayed should update based on my query</p>

        </main>
        <footer>&copy; 3 BBY</footer>
      </main>
    </>
  )
}

export default App;
