import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_MEALPLAN } from '../utils/mutations';
import { QUERY_MEALPLAN, QUERY_ME, QUERY_USER } from '../utils/queries';
import capitalizeWords from '../utils/helpers'

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

        <div className='container'>
            <div className='lead mb-2'>
                Hello, {capitalizeWords(user.username)}, below will be your mealplans:
            </div>
            <div className='container'>
                {user.mealPlans && user.mealPlans.map((mealPlan) =>
                    <div key={mealPlan._id} className="container align-items-center mb-3">
                        <div className='row'>{mealPlan.mealPlanText}</div>
                        <div className='row'> {mealPlan.createdAt} </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default MealPlanList;