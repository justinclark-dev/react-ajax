import { useEffect } from "react";

const StarshipList = (props) => {

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(props.BASE_URL + `starships/`)
      let JSONdata = await response.json()

      props.setStarships(JSONdata.results);
      props.setNext(JSONdata.next)

      const totalItems = JSONdata.count;
      const theseItems = JSONdata.results.length;

      if (totalItems > theseItems) {
        props.setResultsCounts(`1 - 10 of ${totalItems}`);
      }
    }

    getData()

  }, []);

  const calcPrice = (starship) => {
    let cost = starship.cost_in_credits;
    if (cost === 'unknown') return '*call for price';
    const price = BigInt(cost)
    return price.toLocaleString('en-US');
  };

  const someList = props.starships.map(
    (starship, index) => {
      return (<li key={index} className="card">
        <h2>{starship.name}</h2>
        <p><b>Price:</b> ${calcPrice(starship)}</p>
        <p><b>Starship Class:</b> {starship.starship_class}</p>
        <p><b>Model:</b> {starship.model}</p>
        <p><b>Manufacturer:</b> {starship.manufacturer}</p>
      </li>)
    });

  return (<ul className="cards">{someList}</ul>);
};

export default StarshipList;