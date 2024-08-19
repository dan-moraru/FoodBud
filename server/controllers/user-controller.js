const User = require('../models/User.js');

async function getUser(req, res){
  try{
    const user = await User.findOne({username: req.body.username});
    res.status(200).json({user: user});
  }catch(e){
    res.status(400).json({message: 'User cannot be found'});
  }
}

async function addUser(req, res){
  try{
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,

    });
    await user.save();
    res.status(200).json({message: 'User has been created successfully'});
  }catch(e){
    res.status(400).json({message: 'User cannot be found'});
  }
}

async function getGoals(req, res){
  try{
    const user = await User.findOne({
      $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
    });
    res.status(200).json({goals: user.goals});
  }catch(e){
    res.status(400).json({message: 'User cannot be found'});
  }
}

async function updateGoals(req, res){
  try{
    const user = await User.findOne({
      $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
    });
    user.goals = req.body.goalObj;
    await User.updateOne({ _id: user._id }, { goals: user.goals });
    res.status(200).json({message: 'Goals have been updated successfully'});
  }catch(e){
    res.status(400).json({message: `User cannot be found: ${e}`});
  }
}

async function getDailyFood(req, res){
  try{
    const user = await User.findOne({
      $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
    });
    res.status(200).json({dailyFood: user.dailyFood});
  }catch(e){
    res.status(400).json({message: 'User cannot be found'});
  }
}

async function addDailyFood(req, res){
  try{
    const user = await User.findOneAndUpdate(
      {
        $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
      },
      {
        $push: { dailyFood: req.body.dailyFood }
      },
      { new: true }
    );
    res.status(200).json({
      message: 'Daily food has been added successfully',
      dailyFood: user.dailyFood
    });
  }catch(e){
    res.status(400).json({message: 'User cannot be found'});
  }
}

async function removeDailyFood(req, res){
  try{
    const user = await User.findOne({
      $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
    });
    const id = req.params.id;
    user.dailyFood = user.dailyFood.filter(food => food._id.toString() !== id);
    await User.updateOne({ _id: user._id }, { dailyFood: user.dailyFood });
    res.status(200).json({message: 'Daily food has been removed successfully'});
  }catch(e){
    res.status(400).json({message: 'User cannot be found'});
  }
}

async function getTotalDailyFood(req, res){
  try{
    const user = await User.findOne({
      $or: [{ username: req.session.user.username }, { email: req.session.user.email }]
    });
    const dailyFood = user.dailyFood;
    const sumObject = { 
      calories: 0,
      fat: 0,
      protein: 0,
      carbohydrate: 0,
      sugars: 0,
      sodium: 0,
      calcium: 0,
      cholesterol: 0
    };

    dailyFood.forEach(food => {
      sumObject.calories += food.calories;
      sumObject.fat += food.fat;
      sumObject.protein += food.protein;
      sumObject.carbohydrate += food.carbohydrate;
      sumObject.sugars += food.sugars;
      sumObject.sodium += food.sodium;
      sumObject.calcium += food.calcium;
      sumObject.cholesterol += food.cholesterol;
    });
    res.status(200).json({totalDailyFood: sumObject});
  }catch(e){
    res.status(400).json({message: 'User cannot be found'});
  }
}


async function reinitializeDailyFood() {
  try {
    // Find all users
    const users = await User.find({});

    // Iterate over each user
    for (const user of users) {
      // Check dailyFood for each user
      user.dailyFood.forEach(async (food) => {
        const isoString = food.timestamp;
        const date = new Date(isoString);
        const diffMilliseconds = Math.abs(new Date() - date);
        const diffHours = diffMilliseconds / (1000 * 60 * 60);
        if (diffHours > 24) {
          // Remove the expired food entry
          user.dailyFood.splice(user.dailyFood.indexOf(food), 1);
          // Save the updated user
          await user.save();
        }
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}



module.exports = {getUser, addUser, getGoals, updateGoals, getDailyFood, addDailyFood,
  reinitializeDailyFood, removeDailyFood, getTotalDailyFood};
