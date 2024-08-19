const Food = require('../models/Food.js');
const User = require('../models/User.js');

/**
 * Get specific food that you are searching for. Gives you info about the food and stuff.
 * @param {*} req 
 * @param {*} res 
 */
const getFood = async (req, res) => {
  try{
    const foodId = req.params.foodId;
    const foodDb = await Food.findById(foodId, {projection: { _id: 0, __v: 0}});
    const dvFoodData = calculateDVPercentages(foodDb);
    res.status(200).json({ data: dvFoodData });
  } catch (e) {
    console.error(`ERROR. Could not access data. \n Error Info: ${e}`);
    res.status(500).json({
      content: 'A server-side exception has occured.',
      response: 500
    });
  }
};

/**
 * Gets all the food names from the database
 * @param {*} req
 * @param {*} res 
 */
const getFoods = async (req, res) => {
  try{
    const allData = await Food.find({ isCustom: false }, { name: 1, _id: 1 });
    res.status(200).json({
      allFoods: allData
    });
  } catch (e) {
    console.error(`ERROR. Could not access data. \n Error Info: ${e}`);
    res.status(500).json({
      content: 'A server-side exception has occured.',
      response: 500
    });
  }
};

/**
 * Gets all the custom foods of a specified user
 * @param {*} req 
 * @param {*} res 
 */
const getFoodsCustom = async (req, res) => {
  try{
    const user = await User.findOne({
      $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
    });
    const customFoods = await User.findOne({ _id: user._id }).populate('customFood').exec();
    res.status(200).json({
      allCustomFoods: customFoods.customFood
    });
  } catch (e) {
    console.error(`ERROR. Could not access data. \n Error Info: ${e}`);
    res.status(500).json({
      content: 'A server-side exception has occured.',
      response: 500
    });
  }
};

/**
 * Used when you want multiple different foods and something with it.
 * Ex: add foods to calculate calories, add specific foods to create nutrition facts ticket, etc.
 * @param {*} req 
 * @param {*} res 
 */
const getTotalNutrition = async (req, res) => {
  try{
    const totalFoodsIds = req.body;
    const allFoods = await Food.find({ _id: { $in: totalFoodsIds } }, { _id: 0, __v: 0 });
    let totalNut = calculateTotalNutrition(allFoods);
    totalNut = calculateDVPercentages(totalNut);
    res.status(200).json({ totalNutrition: totalNut });
  } catch(e) {
    console.error(`ERROR. Could not access data. \n Error Info: ${e}`);
    res.status(500).json({
      content: 'A server-side exception has occoured.',
      response: 500
    });
  }
};

const insertFoodCustom = async (req, res) => {
  try {
    const newFood = req.body.foodObj;
    const user = await User.findOne({
      $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
    });
    newFood.userId = user._id;
    const food = new Food(newFood);
    await food.save();
    user.customFood.push(food._id);
    await User.updateOne({ _id: user._id }, { customFood: user.customFood });
    return res.status(201).json({status: 'Add new success', NewData:newFood});
  } catch(error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateFoodCustom = async (req, res) => {
  try {
    const updatedFoodName = req.params.foodName;
    const updatedFood = req.body.foodObj;
    const user = await User.findOne({
      $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
    });
    const food = await Food.findOne({ userId: user._id, name: updatedFoodName });
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    food.set(updatedFood);
    await food.save();
    return res.status(200).json({status: 'Update success', updatedData: food});
  } catch(error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


const deleteFoodCustom = async (req, res) => {
  const deletedFoodName = req.params.foodName;
  const foodObj = await Food.findOne({ name: deletedFoodName });
  const user = await User.findOne({
    $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
  });
  
  if (!foodObj) {
    return res.status(404).json({ message: `Food with name ${deletedFoodName} not found` });
  }

  if (!foodObj.isCustom) {
    return res.status(403).json({ message: `ERROR! Can't delete this food. Only delete custom 
    foods that users create` });
  }
  await Food.deleteOne({ name: deletedFoodName});
  user.customFood.splice(user.customFood.indexOf(foodObj._id), 1);
  await user.save();
  return res.status(204).json({ message: `Custom food deleted successfully` });
};

// https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels
function calculateDVPercentages(foodObj) {
  const dailyValue = {
    fat: 78,
    protein: 50,
    carbohydrate: 285,
    sugars: 50,
    fiber: 28,
    cholesterol: 300,
    calcium: 1300,
    iron: 18,
    potassium: 4700,
    vitaminA: 900,
    vitaminC: 90,
    vitaminB12: 2.4,
    vitaminD: 20,
    sodium: 2300
  };

  if ('_doc' in foodObj) {
    foodObj = foodObj._doc;
  }

  for (const key in foodObj) {
    if (typeof foodObj[key] === 'number') {
      const percent = parseFloat((100 * foodObj[key] / dailyValue[key]).toFixed(0));
      foodObj[key] = { value: foodObj[key], percent: percent};
    }
  }

  return foodObj;
}

function calculateTotalNutrition(foodArray) {
  const totalMacrosObject = {
    name: '',
    calories: 0,
    fat: 0,
    protein: 0,
    carbohydrate: 0,
    sugars: 0,
    fiber: 0,
    cholesterol: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminB12: 0,
    vitaminD: 0,
    sodium: 0
  };

  for (const currFood of foodArray) {
    totalMacrosObject.calories += currFood.calories;
    totalMacrosObject.fat += currFood.fat;
    totalMacrosObject.protein += currFood.protein;
    totalMacrosObject.carbohydrate += currFood.carbohydrate;
    totalMacrosObject.sugars += currFood.sugars;
    totalMacrosObject.fiber += currFood.fiber;
    totalMacrosObject.cholesterol += currFood.cholesterol;
    totalMacrosObject.calcium += currFood.calcium;
    totalMacrosObject.iron += currFood.iron;
    totalMacrosObject.potassium += currFood.potassium;
    totalMacrosObject.vitaminA += currFood.vitaminA;
    totalMacrosObject.vitaminC += currFood.vitaminC;
    totalMacrosObject.vitaminB12 += currFood.vitaminB12;
    totalMacrosObject.vitaminD += currFood.vitaminD;
    totalMacrosObject.sodium += currFood.sodium;
  }
  
  for (const key in totalMacrosObject) {
    if (typeof totalMacrosObject[key] === 'number') {
      totalMacrosObject[key] = parseFloat(totalMacrosObject[key].toFixed(1));
    }
  }

  totalMacrosObject.name = 'Total Nutrition';

  return totalMacrosObject;
}

module.exports = {
  getFood, getFoods, getFoodsCustom, getTotalNutrition, 
  insertFoodCustom, updateFoodCustom, deleteFoodCustom
};
