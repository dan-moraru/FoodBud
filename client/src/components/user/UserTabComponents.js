import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import blank from '../../img/blank.webp';

export function UserInfo({user, handleLogout}) {
  return (
    <section id="user-info">
      <img src={user.profileImageURI ? user.profileImageURI : blank} alt="Profile pic" />
      <h2>{user.name}</h2>
      <Link to="/daily-food">
        <button className="functionality-btn" id="daily-food-btn">View daily food</button>
      </Link>
      <div>
        <button id="logout-btn" onClick={handleLogout}>Logout</button>
      </div>  
    </section>
  );
}

export function UserCustomIngredients({customFoods, setFoodToEdit}) {
  const customFoodsLis = [];

  // if no custom foods, display warning paragraph
  if (customFoods.length === 0) {
    customFoodsLis.push(
      <NoFoodsParagraph key="no_foods"/>
    );
  } else { 
    for (const food of customFoods) {
      customFoodsLis.push(
        <SingleCustomIngredient food={food} setFoodToEdit={setFoodToEdit}
          key={food.name}/>
      );
    }
  }

  return (
    <section id="custom-ingredients">
      <h2>Your custom ingredients</h2>
      <ul id="custom-foods-ul">
        {customFoodsLis}
      </ul>
      <Link to="/custom-ingredient">
        <button className="functionality-btn" onClick={() => setFoodToEdit(null)}>
          Create new ingredient</button>
      </Link>
    </section>
  );
}

export function SingleCustomIngredient({food, setFoodToEdit}) {
  const navigate = useNavigate();
  return <>
    <li onClick={() => {
      setFoodToEdit(food);
      navigate(`/custom-ingredient/${food.name}`);
    }}>{food.name}</li>
  </>;
}

export function NoFoodsParagraph() {
  return <>
    <p key="no_foods"><b>It seems you haven't created custom ingredients yet.
    You can get started by pressing the button below.</b></p>  
  </>;
}

export function UserDailyGoals({dailyFoodTotal, goals}) {
  const goalsList = [];

  const calculatePercentage = (dailyNutrientTotal, goal) => {
    const percentage = dailyNutrientTotal / goal * 100;
    return parseFloat(percentage.toFixed(2));
  };

  // Check if all goals are equal to 0
  const allGoalsZero = Object.values(goals).every(goal => goal === 0);

  if (allGoalsZero) {
    return (
      <section id="user-goals">
        <h2>Your daily goals</h2>
        <p><b>It seems you haven't set any goals yet.</b></p>
        <Link to="/goals">
          <button className="functionality-btn">Modify Goals</button>
        </Link>
      </section>
    );
  }

  // Generate goals list
  for(const key in goals) {
    if(dailyFoodTotal && goals[key] > 0) {
      goalsList.push(
        <li key={key}>
          {key}: 
          <span style={{ marginRight: '5px' }} className="daily-goals-numbers">
            <span style={{ marginLeft: '2%' }}>{dailyFoodTotal[key]}/{goals[key]}</span>
            <span style={{ marginLeft: '5%' }}>
              {calculatePercentage(dailyFoodTotal[key], goals[key])}%
            </span>
          </span>
        </li>

      );
    }
  }

  return (
    <section id="user-goals">
      <h2>Your daily goals</h2>
      <ul>
        {goalsList}
      </ul>
      <Link to="/goals">
        <button className="functionality-btn">Modify Goals</button>
      </Link>
    </section>
  );
}