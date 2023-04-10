import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    email
    username
    mealPlans {
      mealPlanText
      mealPlanAuthor
      createdAt
      _id
    }
  }
}
`;

export const QUERY_MEALPLAN = gql`
query mealPlan($mealPlanId: ID!) {
  mealPlan(mealPlanId: $mealPlanId) {
    _id
    createdAt
    mealPlanAuthor
    mealPlanText
  }
}
`;

export const QUERY_USERS = gql`
query users{
  users {
    _id
    email
    username
    mealPlans {
      mealPlanText
      mealPlanAuthor
      createdAt
      _id
    }
  }
}
`;


export const QUERY_ME = gql`
query me{
  me {
    username
    email
    _id
    mealPlans {
      mealPlanText
      mealPlanAuthor
      createdAt
      _id
    }
  }
}
`;