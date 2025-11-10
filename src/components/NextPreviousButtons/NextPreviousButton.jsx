/*

            search={search}
            setSearch={setSearch}
   
            setNext={setNext}
            setPrevious={setPrevious}


*/
const NextPreviousButtons = (props) => {
  const { 
    next, 
    previous, 
    starships, 
    setStarships, 
    search, 
    setSearch, 
    setNext, 
    setPrevious, 
    resultsCounts, 
    setResultsCounts 

  } = props;

  const getPageFromURL = (urlParam) => {
    // Create a URL object
    const url = new URL(urlParam);

    // Create a URLSearchParams object
    const params = new URLSearchParams(url.search);

    // Get individual parameters
    return params.get('page');

  };

  const goToPage = async (direction) => {

    let page;
    if (direction === 'next') page = next;
    if (direction === 'previous') page = previous;

    let response = await fetch(page)
    let JSONdata = await response.json()

    setStarships(JSONdata.results);

    // console.log(36 % 10)

    const totalItems = JSONdata.count;
    
    // console.log(next);
    // console.log(previous);

    const nextPage = next ? getPageFromURL(next) : '';
    const previousPage = previous ? getPageFromURL(previous) : '';

    if (direction === 'next') {
      const lastItem = nextPage * 10 >= totalItems ? totalItems : `${nextPage}0`
      if (!previousPage && nextPage) {
        console.log('First page')
        console.log('11 - 20')
        setResultsCounts(`${nextPage - 1}1 - ${lastItem} of ${totalItems}`)
      } else {
        setResultsCounts(`${nextPage - 1}1 - ${lastItem} of ${totalItems}`)
      }
    }

    if (direction === 'previous') {
      const firstItem = previousPage - 1 === 0 ? 1 : `${previousPage - 1}1`
      if (!previousPage && nextPage) {
        // console.log('First page')
        console.log('1-10')
      } else {
        setResultsCounts(`${firstItem} - ${previousPage}0 of ${totalItems}`)
      }
    }



    // console.log(`next page: ${nextPage}`)
    // console.log(`previous page: ${previousPage}`)

    // console.log(JSONdata.count)
    // console.log(JSONdata);

    JSONdata.next ? setNext(JSONdata.next) : setNext('');
    JSONdata.previous ? setPrevious(JSONdata.previous) : setPrevious('');
  };


  return (
    <>
      {previous ?
        <button onClick={() => goToPage('previous')}>&#x1F82C;</button> :
        <button onClick={() => goToPage('previous')} disabled >&#x1F82C;</button>
      }

      &nbsp;&nbsp;{ resultsCounts }&nbsp;&nbsp;

      {next ?
        <button onClick={() => goToPage('next')}>&#x279E;</button> :
        <button onClick={() => goToPage('next')} disabled >&#x279E;</button>
      }
    </>
  )
};

export default NextPreviousButtons;