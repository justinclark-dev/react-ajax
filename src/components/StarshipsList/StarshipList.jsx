import { useEffect } from "react";

const StarshipList = (props) => {


  // const getPageFromURL = (urlParam) => {
  //   // Create a URL object
  //   const url = new URL(urlParam);

  //   // Create a URLSearchParams object
  //   const params = new URLSearchParams(url.search);

  //   // Get individual parameters
  //   return params.get('page');

  // };


  useEffect(() => {
    const getData = async () => {
      let response = await fetch(props.BASE_URL + `starships/`)
      let JSONdata = await response.json()

      console.log(JSONdata)


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
    const name = starship.name;
    const passengers = (starship.passengers).replace(/,/g, '');

    let cost = starship.cost_in_credits;
    if (passengers === 'n/a' || cost === 'unknown') return '*call for price';
    // console.log('===============================================')
    // console.log(`name: ${name}, passengers: ${passengers}, cost: ${cost}`)

    const price = BigInt(cost)// * BigInt(passengers);
    return price.toLocaleString('en-US');
  };

  const someList = props.starships.map(
    (starship, index) => {

      // const price = passengers * cost;
      return (<li key={index} className="card">
        <h2>{starship.name}</h2>
        <p>{starship.starship_class}</p>
        <p><b>Price:</b> ${calcPrice(starship)}</p>
        <p><b>Starship Class:</b> {starship.starship_class}</p>
        <p><b>Model:</b> {starship.model}</p>
        <p><b>Manufacturer:</b> {starship.manufacturer}</p>
      </li>)
    });

  return (
    <>


      {/* {props.starships.length ? `${props.starships.length} results` : ''} */}
      <ul className="cards">
        {someList}
      </ul>

    </>
  );
};

export default StarshipList;