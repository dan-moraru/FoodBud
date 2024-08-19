import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { FoodListStats } from './FoodComponents.js';
import FoodList from './FoodList.js';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/MainPage.css';
import '../../styles/SearchBar.css';

function MainPage({ listFood, isLoggedIn, updateWithCustomFood, savedFoodList, saveFoodList,
  setUserdailyFood, setUserTotalDailyFood }) {
  // What food is currently selected, for detail view
  const [selectedFood, setSelectedFood] = useState(null);
  // List of foods in "cart"
  const [addedFoods, setAddedFoods] = useState([]);
  // Total food nutrition object
  const [totalFood, setTotalFood] = useState(null);
  async function getTotalNutrition(addedFoods){
    if (addedFoods.length !== 0){
      const foodIds = addedFoods.map(food => food._id);
      try {
        const url = '/food-buds/api/v1/total-foods';
        const resp = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(foodIds),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const totalFoodData = await resp.json();
        setTotalFood(totalFoodData.totalNutrition);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  useEffect(() => {
    getTotalNutrition(addedFoods);
    updateWithCustomFood();

    if (addedFoods.length === 0) {
      setTotalFood(prev => null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedFoods]);

  useEffect(() => {
    setAddedFoods(savedFoodList.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectFood = function (food) {
    setSelectedFood(prev => food);
  };
  
  const onAddFood = async function (food) {
    const newAddedFoods = [...addedFoods];
    const foodId = food._id;
    let foodData;
    try {
      const url = '/food-buds/api/v1/specific-food/' + foodId;
      const resp = await fetch(url);
      const respData = await resp.json();
      foodData = respData.data;
      newAddedFoods.push(foodData);
      setAddedFoods(newAddedFoods);
      saveFoodList(newAddedFoods);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onDeleteFood = function (food) {
    const name = food.name;
    const foodsList = [...addedFoods];
    const newFoodsList = foodsList.filter(food => food.name !== name);
    setAddedFoods(newFoodsList);
    saveFoodList(newFoodsList);
  };

  const backToTotal = function () {
    setSelectedFood(prev => null);
    setTotalFood(totalFood);
  };

  return <>
    <section id="main-page">
      <div className="section-search">
        <FoodList foods={listFood} addedFoods={addedFoods}
          onSelectFood={onSelectFood} onAddFood={onAddFood} onDeleteFood={onDeleteFood}
          isLoggedIn={isLoggedIn}
          totalFood={totalFood}
          setUserdailyFood = {setUserdailyFood}
          setUserTotalDailyFood = {setUserTotalDailyFood} />
      </div>
      <div className="section-stats">
        <FoodListStats selectedFood={selectedFood} backToTotal={backToTotal} 
          totalFood={totalFood} />
      </div>
    </section>
    <ToastContainer />
  </>;
}

export default MainPage;