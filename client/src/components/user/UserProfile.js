import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { 
  UserInfo,
  UserCustomIngredients, 
  UserDailyGoals
} from './UserTabComponents.js';
import '../../styles/UserProfile.css';

function UserProfile({setIsLoggedIn, setFoodToEdit, userTotalDailyFood}) {
  const [user, setUser] = useState(null);
  const [customFoods, setCustomFoods] = useState([]);
  const [userGoals, setUserGoals] = useState([{}]);
  const navigate = useNavigate();

  async function userSession(){
    const resp = await fetch('/auth/session');
    if (resp.status === 200) {
      const user = await resp.json();
      setUser(user.user);
      const goals = await axios.get('/api/v1/goals');
      setUserGoals(goals.data.goals);
    }
  }

  async function getCustomFoods() {
    const resp = await fetch('/food-buds/api/v1/custom-all-foods');
    if (resp.status === 200) {
      const allCustomFoods = await resp.json();
      setCustomFoods(allCustomFoods.allCustomFoods);
    }
  }

  const handleLogout = async () => {
    await fetch('/auth/logout', {
      method: 'POST',
    });
    toast.success('Successfully logged out!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    userSession();
    getCustomFoods();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // waiting for user
  if (!user) {
    return <>
      <section id="user-profile-container">
        <h1>Loading...</h1>
      </section>
    </>;
  }

  if (user.error && user.error === 'not logged in') {
    return <>
      <section id="user-profile-container">
        <h1 id="not-login">It seems that you aren't logged in.</h1>
      </section>
    </>;
  }

  return <>
    <section id="user-profile-container">
      <section id="user-info-container">
        <UserInfo user={user} handleLogout={handleLogout}/>
      </section>
      <section id="user-food-tabs">
        <UserCustomIngredients customFoods={customFoods} setFoodToEdit={setFoodToEdit}/>
        <UserDailyGoals dailyFoodTotal={userTotalDailyFood} goals={userGoals}/>
      </section>
    </section>
    <ToastContainer />
  </>;
}

export default UserProfile;