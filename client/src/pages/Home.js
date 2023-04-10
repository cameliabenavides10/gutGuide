import React from 'react';
import { useQuery } from '@apollo/client';
import Jumbo from '../components/Jumbotron';
import MealPlanList from '../components/MealPlanList';
import Auth from '../utils/auth';
// import ThoughtForm from '../components/ThoughtForm';

import { QUERY_ME } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const mealPlans = data?.me?.mealPlans || [];
console.log(data);
console.log(mealPlans)
  return (
    <main>{Auth.loggedIn(true) ? ((<div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Fluid jumbotron</h1>
      <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
    </div>
  </div> )) : 
  (<Jumbo />) }
      <div className="flex-row justify-center">
        {/* <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          
        </div> */}
        {/* mealplan list */}
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MealPlanList
              mealPlans={mealPlans}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
