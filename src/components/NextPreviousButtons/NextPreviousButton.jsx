const NextPreviousButtons = (props) => {
  const { 
    next, 
    previous, 
    setStarships, 
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

    const totalItems = JSONdata.count;
    const nextPage = next ? getPageFromURL(next) : '';
    const previousPage = previous ? getPageFromURL(previous) : '';

    if (direction === 'next') {
      const lastItem = nextPage * 10 >= totalItems ? totalItems : `${nextPage}0`
      setResultsCounts(`${nextPage - 1}1 - ${lastItem} of ${totalItems}`)
    }

    if (direction === 'previous') {
      const firstItem = previousPage - 1 === 0 ? 1 : `${previousPage - 1}1`
      setResultsCounts(`${firstItem} - ${previousPage}0 of ${totalItems}`)
    }

    JSONdata.next ? setNext(JSONdata.next) : setNext('');
    JSONdata.previous ? setPrevious(JSONdata.previous) : setPrevious('');
  };

  return (
    <div className='nextPreviousButtons'>
      {previous ?
        <button onClick={() => goToPage('previous')}>&lt;</button> :
        <button onClick={() => goToPage('previous')} disabled >&lt;</button>
      }
      &nbsp;&nbsp;{ resultsCounts }&nbsp;&nbsp;
      {next ?
        <button onClick={() => goToPage('next')}>&gt;</button> :
        <button onClick={() => goToPage('next')} disabled >&gt;</button>
      }
    </div>
  )
};

export default NextPreviousButtons;