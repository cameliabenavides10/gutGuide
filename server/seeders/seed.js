const db = require('../config/connection');
const { User, MealPlan } = require('../models');
const userSeeds = require('./userSeeds.json');
const mealPlanSeeds = require('./mealPlanSeeds.json');
// const thoughtSeeds = require('./thoughtSeeds.json');

db.once('open', async () => {
  try {

    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < mealPlanSeeds.length; i++) {
      const { _id, mealPlanAuthor } = await MealPlan.create(mealPlanSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: mealPlanAuthor },
        {
          $addToSet: {
            mealPlans: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
