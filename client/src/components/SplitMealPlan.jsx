import MealPlanList from "./MealPlanList";


export default function SplitMealPlan({ formattedDays }) {
    console.log(formattedDays)

    const renderedDays = formattedDays.map((day, index) => {
        // Access the content of each day
        const dayContent = day.props.children[1];

        // Perform any desired manipulation or rendering of the day's content
        // For example, splitting the content into breakfast, lunch, and dinner
        // and rendering them separately
        const [weekDay, breakfast, lunch, dinner] = dayContent.split('\n');
        return (
            <div className="list-group-item" key={index}>

                <div className="mt-3">
                    <h4>{weekDay}</h4>
                    <ul class="list-group"> 
                    <li type="button" className=" btn btn-light"> {breakfast}</li>
               
                    <li type="button" className="btn btn-light">{lunch}</li>
               
                    <li type="button" className="btn btn-light"> {dinner}</li>
                    </ul>
                </div>
            </div>
        );
    });

    return <>{renderedDays}</>;































    // const formattedStuff = formattedDays.map((day, index) => {

    //   const meals = day.split(/(?=\b(?:Breakfast|Lunch|Dinner)\b)/);
    //   const formattedMeals = meals.map((meal, mealIndex) => (
    //     <div className="mb-3" key={mealIndex}>{meal}</div>
    //   ));

    //   return formattedMeals;
    // });

    // return (
    //   <>
    {/* {formattedStuff} */ }
    {/* </> */ }
    // );
}