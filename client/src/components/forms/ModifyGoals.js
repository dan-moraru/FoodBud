import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//import TopNavbar from '../Navbar';
import InputRow from './InputRow';
import InputBlock from './InputBlock';
import InputField from './InputField';

import '../../styles/UserForm.css';

function ModifyGoals(){
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const goalObj = {
      goalObj:
            {
              calories: formData.calories,
              fat: formData.fat,
              protein: formData.protein,
              carbohydrate: formData.carbohydrate,
              sugars: formData.sugars,
              sodium: formData.sodium,
              calcium: formData.calcium,
              cholesterol: formData.cholesterol
            }
    };
    try {
      await axios.put(`/api/v1/goals`, goalObj);
      navigate('/profile');
    } catch (err) {
      console.error(err);
    }
  };
    
  useEffect(() => {
    async function fetchData() {
      try {
        const goals = await axios.get('/api/v1/goals');
        setFormData(goals.data.goals);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      {/*<TopNavbar/> removing this because the nav bar gets displayed twice*/}
      {formData && 
      <main className="form-page">
        <form onSubmit={handleSubmit} className="user-form">
          <h1>Modifying daily goals</h1>
          <h2>Enter your maximum daily consumption</h2>
          <InputRow>
            <InputBlock>
              <InputField
                label="Calories"
                name="calories"
                type="number"
                valueToEdit={formData.calories}
                onChange={handleInputChange}
              />
              <InputField
                label="Fat"
                name="fat"
                type="number"
                valueToEdit={formData.fat}
                onChange={handleInputChange}
              />
              <InputField
                label="Protein"
                name="protein"
                type="number"
                valueToEdit={formData.protein}
                onChange={handleInputChange}
              />
              <InputField
                label="Carbohydrate"
                name="carbohydrate"
                type="number"
                valueToEdit={formData.carbohydrate}
                onChange={handleInputChange}
              />
            </InputBlock>

            <InputBlock>
              <InputField
                label="Sugars"
                name="sugars"
                type="number"
                valueToEdit={formData.sugars}
                onChange={handleInputChange}
              />
              <InputField
                label="Sodium"
                name="sodium"
                type="number"
                valueToEdit={formData.sodium}
                onChange={handleInputChange}
              />
              <InputField
                label="Calcium"
                name="calcium"
                type="number"
                valueToEdit={formData.calcium}
                onChange={handleInputChange}
              />
              <InputField
                label="Cholesterol"
                name="cholesterol"
                type="number"
                valueToEdit={formData.cholesterol}
                onChange={handleInputChange}
              />
            </InputBlock>

          </InputRow>
          <section className="form-btn-row">
            <button type="submit" className="submit-btn">Save Modifications</button>
          </section>
        </form>
      </main>
      }
    </div>
  );
}

export default ModifyGoals;