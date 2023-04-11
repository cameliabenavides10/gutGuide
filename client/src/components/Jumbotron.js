import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_MEALPLAN, QUERY_ME } from '../utils/queries';



const Jumbo = ({
  
}) => {
return(
  <div>

 
    <div class="jumbotron">
  <h1 class="display-4">Hello!</h1>
  <p class="lead">Welcome to Meal Planner Pro</p>
  <hr class="my-3" />
  <p>The ultimate solution for anyone looking to plan their meals in a hassle-free way while keeping their dietary restrictions in mind. Our website is designed to help you create a personalized meal plan for the week that perfectly suits your lifestyle and dietary preferences.</p>

  <p class="lead">
    <a class="btn btn-primary btn-md" href="#" role="button">Lets get started!</a>
  </p>
</div>

<p className='mx-5'>
Our user-friendly interface allows you to choose from a variety of dietary restrictions such as gluten-free, vegan, vegetarian, low-carb, and many more. Once you've selected your preferences, our website will generate a meal plan for the week, complete with recipes that are easy to follow and delicious to taste.

But that's not all, Meal Planner Pro also creates a grocery list based on your meal plan, making your grocery shopping experience a breeze. No more wandering aimlessly around the grocery store trying to remember everything you need, with our website, you'll have a comprehensive list of ingredients at your fingertips.

Our website also allows you to save your favorite recipes and meal plans, making it easy to access them whenever you need them. Whether you're a busy parent, a health enthusiast, or simply someone who wants to make meal planning a breeze, Meal Planner Pro has got you covered.

So why wait? Sign up today and take the first step towards a healthier, happier lifestyle with our personalized meal planning and grocery list services.</p>
</div>
  )
  }

  export default Jumbo;