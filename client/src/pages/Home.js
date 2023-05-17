import React from 'react';
import { useQuery } from '@apollo/client';
import Jumbo from '../components/Jumbotron';
import MealPlanList from '../components/MealPlanList';
import Auth from '../utils/auth';
import capitalizeWords from '../utils/helpers'
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_MEALPLAN, QUERY_ME, QUERY_USER } from '../utils/queries';




const Home = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const mealPlans = data?.me?.mealPlans || [];

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

console.log(data);
console.log(mealPlans)
  return (
  
    <main>
      {/* jumbotron when signed in */}
      {Auth.loggedIn(true) ? ((<div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hello, {capitalizeWords(user.username)}.</h1>
      <p class="lead"> Welcome to GutGuide. We are here to help you make smart decisions based on your dietary restrictions and weight goals!</p>
    </div>
  </div> )) : 
  // when not signed in
  (<Jumbo />) }
      <div className="flex-row justify-center">
     
        {/* mealplan list */}
        <div className="col-12 col-md-8 mb-3">
        
<br />


        
        </div>
      </div>
    </main>
  );
};

export default Home;
