import { useState, useEffect } from 'react';
import searchIcon from'../../img/searchIcon.webp'; 

function SearchBar({foodsName, onFoodSearch}) {
  const [searchTarget, setSearchTarget] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (foodsName.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [foodsName]);

  /**
   * Simple regex-type function that finds matching food names in the food list
   * @param {string} input What needs to be searched for in the list
   */
  function matchSearch(input) {
    if (input === '') {
      return [];
    }
    // eslint-disable-next-line array-callback-return
    return foodsName.filter(function(food) {
      if (food.name.startsWith(input) || food.name.toLowerCase().startsWith(input)) {
        return food;
      }
    });
  }

  /**
   * Creates a <ul> with the search results obtained from matchSearch
   */
  function showResults() {
    if (searchTarget === '') {
      document.querySelector('#search-results').style.visibility = 'hidden';
    } else {
      document.querySelector('#search-results').style.visibility = 'visible';
    }
    const matchedFoods = matchSearch(searchTarget);
    const liNodes = [];
    // cap the amount of results at 10 to not flood the page
    let cap = 10;
    for (const food of matchedFoods) {
      if (cap < 0) {
        break;
      }
      liNodes.push(<li key={food.name}
        onClick={() => {
          setSearchTarget(food.name);
          onFoodSearch(food.name);
          setSearchTarget('');
        }}>{food.name}</li>
      );
      cap--;
    }
    setSearchResults(liNodes);
    const statusEl = document.getElementById('status');
    if(statusEl !== null){
      statusEl.innerText = '';
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(showResults, [searchTarget]);

  return <>
    <section id="food-searchbar">
      <div className="search-and-button">
        <input type="search" id="food-search" name="food-search" 
          placeholder="Search Food" 
          onChange={e => setSearchTarget(e.target.value)}/>
        <button className="search-button" onClick={() => {
          onFoodSearch(searchTarget);
          setSearchTarget('');
        }}><img className="search-icon" src={searchIcon} alt="Search Icon"/></button>
        {isLoading && <div className="loading-animation">Loading...</div>}
        <ul id="search-results">
          {searchResults}
        </ul>
      </div>
    </section>
  </>;
}

export default SearchBar;