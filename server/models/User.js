const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String},
  name: String,
  profileImageURI: String,
  customFood: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(email) {
        return validator.isEmail(email);
      }
    }
  },
  goals:{
    calories: {type: Number, min: 0, default: 0},
    fat: {type: Number, min: 0, default: 0},
    protein: {type: Number, min: 0, default: 0},
    carbohydrate: {type: Number, min: 0, default: 0},
    sugars: {type: Number, min: 0, default: 0},
    sodium: {type: Number, min: 0, default: 0},
    calcium: {type: Number, min: 0, default: 0},
    cholesterol: {type: Number, min: 0, default: 0}
  },
  dailyFood: [{ 
    calories: {type: Number, min: 0, default: 0},
    fat: {type: Number, min: 0, default: 0},
    protein: {type: Number, min: 0, default: 0},
    carbohydrate: {type: Number, min: 0, default: 0},
    sugars: {type: Number, min: 0, default: 0},
    sodium: {type: Number, min: 0, default: 0},
    calcium: {type: Number, min: 0, default: 0},
    cholesterol: {type: Number, min: 0, default: 0},
    timestamp: {type: Date, default: Date.now}
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;