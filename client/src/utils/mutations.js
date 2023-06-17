import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MEALPLAN = gql`
mutation Mutation($mealPlanText: String!, $mealPlanAuthor: String!) {
    addMealPlan(mealPlanText: $mealPlanText, mealPlanAuthor: $mealPlanAuthor) {
      _id
      mealPlanText
      mealPlanAuthor
      createdAt
    }
  }
  `;


export const UPDATE_MEALPLAN = gql`
mutation Mutation($mealPlanId: ID!, $mealPlanText: String!) {
    updateMealPlan(mealPlanId: $mealPlanId, mealPlanText: $mealPlanText) {
      _id
      createdAt
      mealPlanAuthor
      mealPlanText
    }
  }
  `;

export const DELETE_MEALPLAN = gql`
mutation Mutation($mealPlanId: ID!) {
  removeMealPlan(mealPlanId: $mealPlanId) {
    _id
    createdAt
    mealPlanAuthor
    mealPlanText
  }
}
`;