import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_MEALPLAN } from '../utils/mutations';
import { QUERY_MEALPLAN, QUERY_ME, QUERY_USER } from '../utils/queries';
import capitalizeWords from '../utils/helpers'
import SplitMealPlan from './SplitMealPlan';
import DeleteMealPlan from './DeleteMealPlan';





const MealPlanList = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/" />;
    }
    console.log(user)
    if (loading) {
        return <div>Loading...</div>;
    }




    return (

        <div className='container mb-3'>
            <div className='lead mb-3'>
                {/* Hello, {capitalizeWords(user.username)},  */}
                Below will be your mealplans:
            </div>
            <div className='container' style={{width: "70vh"}}>
                {user.mealPlans && user.mealPlans.map((mealPlan) =>
                // formatting of the text block be split of days of the week
                {
                    const text = mealPlan.mealPlanText
                    const daysOfWeek = text.split(/(?=\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b)/);
                    // formatted to break text block into each week days
                    const formattedDays = daysOfWeek.map((day, index) => (
                        <div key={index}> {day}</div>
                    ));

                    // return code for mealplan text on screen 
                    return (
                        <div key={mealPlan._id} className="container align-items-center mb-3">

                            <div className='list-group mb-3' 
                            >{<SplitMealPlan formattedDays={formattedDays} />}</div>
                            <div className='container'>
                                <div className='row mb-3'>
                                    <p className=" col mr-1">Made on: {mealPlan.createdAt} </p>
                                    <DeleteMealPlan  mealPlan={mealPlan}/>
                                    </div>
                            </div>
                        </div>
                    );
                }
                )}
            </div>
        </div>

    )
}

export default MealPlanList;