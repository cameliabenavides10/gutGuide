import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_MEALPLAN } from '../utils/mutations';

export default function DeleteMealPlan({ mealPlan }) {

    const [deleteMealPlan] = useMutation(DELETE_MEALPLAN)

    const handleDeleteMeal = async (mealPlan) => {
        try {
            await deleteMealPlan({
                variables:
                {
                    mealPlanId: mealPlan._id
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    console.log(mealPlan);
    return (
        <>
            <button
                style={{ "height": "33px", "width": "10px" }}
                type="button"
                class="btn btn-success col"
                onClick={() => handleDeleteMeal(mealPlan)}>
                Delete </button>
        </>
    )

}