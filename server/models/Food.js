const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
  name: {type: String, required: true},
  calories: {type: Number, min: 0, default: 0},
  fat: {type: Number, min: 0, default: 0},
  protein: {type: Number, min: 0, default: 0},
  carbohydrate: {type: Number, min: 0, default: 0},
  sugars: {type: Number, min: 0, default: 0},
  fiber: {type: Number, min: 0, default: 0},
  cholesterol: {type: Number, min: 0, default: 0},
  calcium: {type: Number, min: 0, default: 0},
  iron: {type: Number, min: 0, default: 0},
  potassium: {type: Number, min: 0, default: 0},
  vitaminA: {type: Number, min: 0, default: 0},
  vitaminC: {type: Number, min: 0, default: 0},
  vitaminB12: {type: Number, min: 0, default: 0},
  vitaminD: {type: Number, min: 0, default: 0},
  sodium: {type: Number, min: 0, default: 0},
  isCustom: {type: Boolean, default: false},
  userId: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;