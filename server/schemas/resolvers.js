const { AuthenticationError } = require('apollo-server-express');
const { User, MealPlan } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('mealPlans');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('mealPlans');
      },
      mealPlans: async (parent, { username }) => {
        const params = username ? { username } : {};
        return MealPlan.find(params).sort({ createdAt: -1 });
      },
      mealPlan: async (parent, { mealPlanId }) => {
        return MealPlan.findOne({ _id: mealPlanId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('mealPlans');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
        addMealPlan: async (parent, { userId, mealPlanText }, context) => {
            if (context.user) {
              const mealPlan = await MealPlan.create({
                mealPlanText,
                mealPlanAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { mealPlans: mealPlan._id } }
              );
              return mealPlan;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          removeMealPlan: async (parent, { mealPlanId }, context) => {
            if (context.user) {
              const mealPlan = await MealPlan.findOneAndDelete({
                _id: mealPlanId,
                mealPlanAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { mealPlans: mealPlanId } },
      
              );
      
              return mealPlan;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          updateMealPlan: async (parent, { mealPlanId, mealPlanText }, context) => {
            if (context.user) {
              const mealPlan = await MealPlan.findByIdAndUpdate(mealPlanId, {
                mealPlanText: mealPlanText,
              });
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $set: { mealPlanText } },
                { new: true }
              );
              return mealPlan;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
      
    },
};

module.exports = resolvers;