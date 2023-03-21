const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const mealPlanSchema = new Schema({
    mealPlanText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    mealPlanAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
 
  });
  
  const MealPlan = model('MealPlan', mealPlanSchema);
  
  module.exports = MealPlan;
  