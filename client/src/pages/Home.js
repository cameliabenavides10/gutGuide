import React from 'react';
import { useQuery } from '@apollo/client';
// import Jumbo from '../components/Jumbotron';
import MealPlanList from '../components/MealPlanList';
import Auth from '../utils/auth';
import capitalizeWords from '../utils/helpers'
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_MEALPLAN, QUERY_ME, QUERY_USER } from '../utils/queries';
import groceries from '../assets/groceries.png'
import List from '../components/List';




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
      {/*  HOMEPAGE WHEN SIGNED IN */}
      {Auth.loggedIn(true) ? ((
        <>
      <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hello, {capitalizeWords(user.username)}.</h1>
      <p class="lead"> Welcome to GutGuide. We are here to help you make smart decisions based on your dietary restrictions and weight goals!</p>
    </div>
  
  </div>
   
   < MealPlanList />
 </>
   )) : 


  // HOME WHEN NOT SIGNED IN
  (
  <div  className="jumbo-tron">
   <div class="container" style={{ height: '45rem' }}>
        <div class="row front-page">
          <div class="col-sm-6 "> 
          <h1 className="display-2">
            GutGuide
          </h1>
  <p class="d-flex justify-content-center" >The ultimate solution for anyone looking to plan their meals in a hassle-free way while keeping their dietary restrictions in mind. Our website is designed to help you create a personalized meal plan for the week that perfectly suits your lifestyle and dietary preferences.</p>

  <p class="lead">
    <a class="btn btn-primary btn-md border-0 " href="#" role="button" style={{ backgroundColor: '#5EC57E'}}>Lets get started!</a>
  </p>
  </div>
  <div class="col-sm-6">
      <p class="col-sm-6">
      <div className="img-fluid col-md-6 d-flex justify-content-right">
            <img src={groceries} width="450rem" />
          </div>
  
  </p>
  </div>
  </div>
  </div>
</div>
  

  ) }
    
    </main>
  );
};

export default Home;
