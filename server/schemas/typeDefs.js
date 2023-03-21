const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    mealPlans: [MealPlan]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type MealPlan {
    _id: ID
    mealPlanText: String
    mealPlanAuthor: String
    createdAt: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    mealPlans(username: String): [MealPlan]
    mealPlan(mealPlanId: ID!): MealPlan
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMealPlan( mealPlanText: String!, mealPlanAuthor: String!): MealPlan
    removeMealPlan(mealPlanId: ID!): MealPlan
    updateMealPlan(mealPlanId: ID!, mealPlanText: String!): MealPlan
  }

`;

  module.exports = typeDefs;