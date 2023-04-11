// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { Navigate, useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import Auth from '../utils/auth';
// import { ADD_MEALPLAN } from '../utils/mutations';
// import { QUERY_MEALPLAN, QUERY_ME, QUERY_USER } from '../utils/queries';

// const MealPlanList = () => {
//   const { username: userParam } = useParams();
//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam },
//   });

//   const user = data?.me || data?.user || {};
//   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Navigate to="/" />;
//   }
// console.log(user)
//   if (loading) {
//     return <div>Loading...</div>;
//   }


//   return(
    
//    <div>
//     <div>
//     Hello, {user.username}, 
//     welcome to GutGuide. We are here to help you make smart decisions based on your dietary restrictions and weight goals! 
//     </div>
//     <div>
//   {user.mealPlans && user.mealPlans.map((mealPlan) => 
//     <div key={mealPlan._id} className="row align-items-center">
//       {mealPlan.mealPlanText}
//       <br />
//       {mealPlan.createdAt}
//     </div>
//   )}
// </div>
//    </div>
    
//   )
//   }

//   export default MealPlanList;