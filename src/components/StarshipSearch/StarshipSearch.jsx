import { useState } from "react";

const StarshipSearch = (props) => {

  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSubmit = async (event) => {
    // Prevent automatic form submission
    event.preventDefault();

    // Get Starship Data
    let response = await fetch(props.BASE_URL + `starships/?search=${search}`);
    let JSONdata = await response.json();
    console.log(JSONdata.results)

    // Insert Starship Data into the DOM
    props.setStarships(JSONdata.results);
  }

  return (
    <>
      <h1>Used Starships for Sale near Planet Coruscant</h1>
      <form onSubmit={handleSubmit}>
        Starship Search:
        <input type="text" onChange={handleChange} />
        <input type="submit" value="Show Starship" />
      </form>
    </>
  );

};

export default StarshipSearch;