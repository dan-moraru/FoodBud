import '../../styles/DailyFood.css';
import axios from 'axios';

export default function DailyFood({dailyFoodList, setUserdailyFood, setUserTotalDailyFood}){
  const removeDailyFood = async (e) => {
    await axios.delete(`api/v1/daily-food/${e.target.classList[1]}`);
    setUserdailyFood((prevDailyFood) => {
      return prevDailyFood.filter((food) => {
        return food._id !== e.target.classList[1];
      });
    });
    const totalDailyFood = await axios.get('/api/v1/total-daily-food');
    setUserTotalDailyFood(totalDailyFood.data.totalDailyFood);
  };

  const dailyFoodTickets = [];
  dailyFoodList.forEach((food) => {
    dailyFoodTickets.push(
      <section key={food._id} className="daily-food-ticket">
        <ul className="daily-food-list">
          <li>Calories: {food.calories}</li>
          <li>Protein: {food.protein}</li>
          <li>Sugars: {food.sugars}</li>
          <li>Carbohydrates: {food.carbohydrate}</li>
        </ul>
        <button className={`remove-daily-food-btn ${food._id}`}
          onClick={e=>removeDailyFood(e)}>Remove Daily Food</button>
      </section>
    );
  });

  return (
    <main className="daily-food-page">
      {dailyFoodTickets.length === 0 ?
        <p id="daily-food-status">No daily foods chosen</p>
        : 
        dailyFoodTickets
      }
    </main>
  );
}