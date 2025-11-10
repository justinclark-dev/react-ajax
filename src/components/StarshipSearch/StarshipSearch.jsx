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

    const totalItems = JSONdata.count;
    const theseItems = JSONdata.results.length;

    if (totalItems > theseItems) {
      props.setResultsCounts(`1 - 10 of ${totalItems}`);
    } else {
      props.setResultsCounts(`1 - ${totalItems} of ${totalItems}`);
    }

    JSONdata.next ? props.setNext(JSONdata.next) : props.setNext('');
    JSONdata.previous ? props.setPrevious(JSONdata.previous) : props.setPrevious('');
  }

  return (
    <>
      <h1>Used Starships for Sale near Planet Coruscant</h1>
      <form onSubmit={handleSubmit} className='searchForm'>
        <input type="text" onChange={handleChange} placeholder="Search class, model... etc." />
        <input type="submit" value="Search Starships" />
      </form>
    </>
  );

};

export default StarshipSearch;