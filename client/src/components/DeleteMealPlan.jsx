import React from 'react';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_MEALPLAN } from '../utils/mutations';

export default function DeleteMealPlan({ mealPlan }) {

// const navigate = useNavigate();

// const routeChange = () => {
//   let path = `/`
//   navigate(path);
// }


    const [deleteMealPlan] = useMutation(DELETE_MEALPLAN)

    const handleDeleteMeal = async (mealPlan) => {
        try {
            await deleteMealPlan({
                variables:
                {
                    mealPlanId: mealPlan._id
                },
            });
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }


//   useEffect(() => {
//     routeChange();
//   }, [deleteMealPlan]);


    console.log(mealPlan);
    return (
        <>
            <button
                style={{ "height": "33px", "width": "10px" }}
                type="button"
                class="btn btn-success col mb-5"
                onClick={() => handleDeleteMeal(mealPlan)}>
                Delete </button>
        </>
    )

}