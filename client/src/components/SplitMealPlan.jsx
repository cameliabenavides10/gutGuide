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
            <button type="button" class="list-group-item list-group-item-action" key={index}>

                <div>

                    <h4>{weekDay}</h4>

                    <p>{breakfast}</p>
                </div>
                <div>

                    <p>{lunch}</p>
                </div>
                <div>

                    <p>{dinner}</p>
                </div>
            </button>
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