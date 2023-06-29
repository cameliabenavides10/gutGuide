import MealPlanList from "./MealPlanList";
import { useState, useEffect } from 'react';

export default function SplitMealPlan({ formattedDays }) {

    const [completed, setCompleted] = useState([]);

// local storage to help with completed button function
    useEffect(() => {
        const storedCompletedMeals = localStorage.getItem('completed');
        if (storedCompletedMeals) {
            setCompleted(JSON.parse(storedCompletedMeals));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('completed', JSON.stringify(completed));
    }, [completed]);



    const handleMealClick = (index) => {
        // Check if the day is already marked as completed
        if (completed.includes(index)) {
            // Remove the day from the completed list
            setCompleted(completed.filter((dayIndex) => dayIndex !== index));
        } else {
            // Add the day to the completed list
            setCompleted([...completed, index]);
        }
    };



    const renderedDays = formattedDays.map((day, index) => {
        // Access the content of each day
        const dayContent = day.props.children[1];

        // splitting the content into breakfast, lunch, and dinner
        const [weekDay, breakfast, lunch, dinner] = dayContent.split(/\n\n|\n/);
        const isBreakfastCompleted = completed.includes(index * 3);
        const isLunchCompleted = completed.includes(index * 3 + 1);
        const isDinnerCompleted = completed.includes(index * 3 + 2);
        return (
            <div style={{backgroundColor: "#ECF8E5"}} className="list-group-item" key={index}>

                <div className="mt-1">
                    <h4>{weekDay}</h4>
                    <ul class="list-group">

                        <li 

                            className={isBreakfastCompleted ? 'btn btn-secondary clicked ' : 'btn btn-light not-clicked'}
                            onClick={() => handleMealClick(index * 3)}
                            type="button"
                        >
                            {breakfast.trim()}
                        </li>

                        <li
                            className={isLunchCompleted ? 'btn btn-secondary clicked' : 'btn btn-light not-clicked'}
                            onClick={() => handleMealClick(index * 3 + 1)}
                            type="button"
                        >
                            {lunch.trim()}
                        </li>

                        <li 
                        
                            className={isDinnerCompleted ? 'btn btn-secondary clicked' : 'btn btn-light not-clicked'}
                            onClick={() => handleMealClick(index * 3 + 2)}
                            type="button"
                        >
                            {dinner.trim()}
                        </li>

                    </ul>
                </div>
            </div>
        );
    });






    return <>{renderedDays}</>;

}