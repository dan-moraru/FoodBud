/**
 * React component for users to see the total information
 * of the items in their cart
 */
export function FoodListStats({ selectedFood, backToTotal, totalFood }) {
// when food is selected,show that food. 
// when closed, return display target to total of cart
  if (selectedFood) {
    return <FoodTicket food={selectedFood} backToTotal={backToTotal}/>;
  } else if (totalFood) {
    return <FoodTicket food={totalFood} backToTotal={backToTotal} total={true}/>;
  } else {
    return <>
      <h1 className="placeholder">Select a food, and its information will be displayed here.</h1>
    </>;
  }
}
  
/**
* React component showing the basic info of a food, while on the list
*/
export function FoodCartItem({food, onSelectFood, onDeleteFood}) {
  return (
    <div className="food-item">
      <h3>{food.name}</h3>
      <div className="cart-basic-info">
        <p><b>Calories:</b> {food.calories.value}</p>
      </div>
      <div className="cart-buttons">
        <button onClick={onSelectFood}>View details</button>
        <button onClick={onDeleteFood}>X</button>
      </div>
    </div>
  );
}
  
/**
 * Food ticket that can display total or singular food information
*/
function FoodTicket({ food, backToTotal, total = false}) {
  return (
    <div className="food-ticket">
      <h1>Nutrition Facts</h1>
      <hr></hr>
      <p id="viewing-text">Viewing {food.name}</p>
      <div className="serving-text">
        <p>Serving size</p>
        <p>100g</p>
      </div>
      <hr className="bold-line"></hr>
      <div className="calories-section">
        <div>
          <p className="small-text">Amount per serving</p>
          <p className="calories-text">Calories</p>
        </div>
        <p className="calories-num">{food.calories.value}</p>
      </div>  
      <hr className="med-line"></hr>
      <p className="daily-value"><b>% Daily Value*</b></p>
      <hr></hr>
      <div className="main-nutri">
        <div className="nutri-percentage">
          <p><b>Total Fat</b> {food.fat.value}g</p>
          <p><b>{food.fat.percent}%</b></p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p><b>Cholesterol</b> {food.cholesterol.value}mg</p>
          <p><b>{food.cholesterol.percent}%</b></p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p><b>Sodium</b> {food.sodium.value}mg</p>
          <p><b>{food.sodium.percent}%</b></p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p><b>Total Carbohydrate</b> {food.carbohydrate.value}g</p>
          <p><b>{food.carbohydrate.percent}%</b></p>
        </div>
        <hr></hr>
        <div className="inline-nutri">
          <p>Dietary Fiber {food.fiber.value}g</p>
          <p><b>{food.fiber.percent}%</b></p>
        </div>
        <hr className="small-line"></hr>
        <div className="inline-nutri">
          <p>Total Sugars {food.sugars.value}g</p>
          <p><b>{food.sugars.percent}%</b></p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p><b>Protein</b> {food.protein.value}g</p>
          <p><b>{food.protein.percent}%</b></p>
        </div>
      </div>
      <hr className="bold-line"></hr>
      <div className="second-nutri">
        <div className="nutri-percentage">
          <p>Iron {food.iron.value}mg</p>
          <p>{food.iron.percent}%</p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p>Calcium {food.calcium.value}mg</p>
          <p>{food.calcium.percent}%</p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p>Potassium {food.potassium.value}mg</p>
          <p>{food.potassium.percent}%</p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p>Vitamin A RAE {food.vitaminA.value}mcg</p>
          <p>{food.vitaminA.percent}%</p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p>Vitamin B.12 {food.vitaminB12.value}mcg</p>
          <p>{food.vitaminB12.percent}%</p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p>Vitamin C {food.vitaminC.value}mg</p>
          <p>{food.vitaminC.percent}%</p>
        </div>
        <hr></hr>
        <div className="nutri-percentage">
          <p>Vitamin D {food.vitaminD.value}mcg</p>
          <p>{food.vitaminD.percent}%</p>
        </div>
      </div>
      <hr className="med-line"></hr>
      <p className="daily-value-par">*The % Daily Value (DV) tells you how much a 
          nutrient in a serving of food contributes to a 
          daily diet. 2,000 calories a day is used for 
          general nutrition advice.
      </p>
      {!total ? <><hr></hr><button className="back-total" 
        onClick={backToTotal}><b>Back To Total</b></button></> : null
      }
    </div>
  );
}