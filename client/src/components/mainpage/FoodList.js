import { toast, Zoom } from 'react-toastify';
import axios from 'axios';

import SearchBar from './SearchBar.js';
import { FoodCartItem } from './FoodComponents.js';

/**
 * React component with a list of food items
 * that can be added to the user's "cart"
 */
function FoodList({foods, addedFoods, onSelectFood, onAddFood, onDeleteFood, isLoggedIn,
  totalFood, setUserdailyFood, setUserTotalDailyFood}) {
  let index = 0;
  const foodItemNodes = [];
  for (const food of addedFoods) {
    foodItemNodes.push(
      <FoodCartItem key={food._id + index} food={food} 
        onSelectFood={() => onSelectFood(food)} onDeleteFood={() => onDeleteFood(food)}
      />
    );
    index++;
  }

  /**
   * When search button is clicked, look for food in food list.
   * Add it to the FoodList if food exists.
   */
  function onFoodSearch(foodName) {
    const targetFood = foods.find((food) => food.name === foodName);
    if (targetFood === undefined) {
      toast.error(
        'Can\'t find this food, please try again', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          transition: Zoom
        }
      );
    } else {
      onAddFood(targetFood);
    }

    document.querySelector('#food-search').value = '';
  }

  const addToDailyFood = async () => {
    const modifiedTotatlFood = {...totalFood};
    Object.keys(modifiedTotatlFood).forEach(function(key) {
      // Check if the key's value is an object with both 'value' and 'percent' keys
      if (typeof modifiedTotatlFood[key] === 'object' &&
      modifiedTotatlFood[key].hasOwnProperty('value') &&
      modifiedTotatlFood[key].hasOwnProperty('percent')) {
        // Replace the key's value with just the 'value' part
        modifiedTotatlFood[key] = modifiedTotatlFood[key].value;
      }
    });
    const resp = await axios.post('api/v1/daily-food', {
      dailyFood: modifiedTotatlFood
    });
    const statusEl = document.getElementById('status');
    statusEl.innerText = 'The custom food has been successfully added!';
    setUserdailyFood(resp.data.dailyFood);
    const totalDailyFood = await axios.get('/api/v1/total-daily-food');
    setUserTotalDailyFood(totalDailyFood.data.totalDailyFood);
  };
  
  return (
    <section id="food-list-section">
      <SearchBar foodsName={foods} onFoodSearch={onFoodSearch}/>
      <section id="food-list">
        {foodItemNodes}
        {isLoggedIn && addedFoods.length > 0 && 
          <><button type="button" className="functionality-btn" onClick={addToDailyFood}>
            Add to daily food
          </button><div id="status" className="input-row"></div></>
        }
      </section>
    </section>
  );
}

export default FoodList;