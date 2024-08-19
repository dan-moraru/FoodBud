import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import InputRow from './InputRow';
import InputBlock from './InputBlock';
import InputField from './InputField';

import '../../styles/UserForm.css';

function AddCustomIngredient({foodToEdit, readOnly = false}){
  const [formData, setFormData] = useState(
    foodToEdit ? foodToEdit : {
      name: '',
      calories: 0,
      fat: 0,
      protein: 0,
      calcium: 0,
      iron: 0,
      sodium: 0,
      potassium: 0,
      carbohydrate: 0,
      sugars: 0,
      fiber: 0,
      cholesterol: 0,
      vitaminC: 0,
      vitaminD: 0,
      vitaminB12: 0,
      vitaminA: 0,
      isCustom: true
    });
  const navigate = useNavigate();

  /**
   * Handler for input change events.
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handler for form submission.
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const foodObj = {
      foodObj:
        {
          name: formData.name,
          calories: formData.calories,
          fat: formData.fat,
          protein: formData.protein,
          calcium: formData.calcium,
          iron: formData.iron,
          sodium: formData.sodium,
          potassium: formData.potassium,
          carbohydrate: formData.carbohydrate,
          sugars: formData.sugars,
          fiber: formData.fiber,
          cholesterol: formData.cholesterol,
          vitaminC: formData.vitaminC,
          vitaminD: formData.vitaminD,
          vitaminB12: formData.vitaminB12,
          vitaminA: formData.vitaminA,
          isCustom: true
        }
    };
    try {
      const statusEl = document.getElementById('status');
      if(foodToEdit !== null){
        await axios.put(`/food-buds/api/v1/custom-food/${foodToEdit.name}`, foodObj).
          then(function (response) {
            statusEl.innerText = 'The custom food has been successfully update!';
          }).catch(function (error) {
            statusEl.innerText = 'The custom food is either empty or already exists';
          });
      }else{
        await axios.post('/food-buds/api/v1/custom-food', foodObj).then(function (response) {
          statusEl.innerText = 'The custom food has been successfully added!';
        }).catch(function (error) {
          statusEl.innerText = 'The custom food is either empty or already exists';
        });
      }
      
    } catch (error) {
      console.error('Error adding custom ingredient:', error);
    }
    navigate('/profile');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/food-buds/api/v1/custom-food/${foodToEdit.name}`);
    } catch (error) {
      console.error('Error deleting custom ingredient:', error);
    }
    navigate('/profile');
  };

  return (
    <div>
      <main className="form-page">
        <form className="user-form" onSubmit={handleSubmit}>
          <h1>The serving must be in 100g</h1>
          <InputRow>
            <InputBlock>
              <InputField label="Name" type="text" name="name" onChange={handleInputChange} 
                valueToEdit={foodToEdit ? foodToEdit.name : null} readOnly={readOnly}/>
              <InputField label="Calories" type="number" name="calories" 
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.calories : null} />
              <InputField label="Fat (g)" type="number" name="fat" onChange={handleInputChange} 
                valueToEdit={foodToEdit ? foodToEdit.fat : null}/>
              <InputField label="Protein (g)" type="number" name="protein" 
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.protein : null} />
            </InputBlock>

            <InputBlock>
              <InputField label="Carbohydrate (g)" type="number" name="carbohydrate"
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.carbohydrate : null} />
              <InputField label="Sugars (g)" type="number" name="sugars"
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.sugars : null} />
              <InputField label="Fiber (mg)" type="number" name="fiber" 
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.fiber : null} />
              <InputField label="Cholesterol (mg)" type="number" name="cholesterol"
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.cholesterol : null} />
            </InputBlock>
          </InputRow>

          <InputRow>
            <InputBlock>
              <InputField label="Calcium (mg)" type="number" name="calcium"
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.calcium : null} />
              <InputField label="Iron (mg)" type="number" name="iron" 
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.iron : null} />
              <InputField label="Sodium (mg)" type="number" name="sodium"
                onChange={handleInputChange} 
                valueToEdit={foodToEdit ? foodToEdit.sodium : null} />
              <InputField label="Potassium (mg)" type="number" name="potassium"
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.potassium : null} />
            </InputBlock>
          
            <InputBlock>
              <InputField label="Vitamin C (mcg)" type="number" name="vitaminC"
                onChange={handleInputChange} 
                valueToEdit={foodToEdit ? foodToEdit.vitaminC : null} />
              <InputField label="Vitamin D (mcg)" type="number" name="vitaminD"
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.vitaminD : null} />
              <InputField label="Vitamin B12 (mcg)" type="number" name="vitaminB12"
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.vitaminB12 : null} />
              <InputField label="Vitamin A (mcg)" type="number" name="vitaminA"
                onChange={handleInputChange}
                valueToEdit={foodToEdit ? foodToEdit.vitaminA : null} />
            </InputBlock>
          </InputRow>

          <section className="form-btn-row">
            <button type="submit" className="submit-btn">
              {foodToEdit ? 'Save Changes' : 'Add Custom ingredient'}
            </button>
            {foodToEdit ? <button className="delete-btn"
              onClick={handleDelete}>Delete custom food</button> : <></>}
          </section>
          <div id="status" className="input-row"></div>
        </form>
      </main>
    </div>
  );
}

export default AddCustomIngredient;