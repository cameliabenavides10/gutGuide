import React, { useState } from 'react';
import axios from 'axios';
import { QUERY_MEALPLAN, QUERY_ME, QUERY_USER } from '../utils/queries';
import { ADD_MEALPLAN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const ChatGPT = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [addMealPlan, { error }] = useMutation(ADD_MEALPLAN, {
      update(cache, { data: { addMealPlan } }) {
        try {
          const { MealPlan } = cache.readQuery({ query: QUERY_MEALPLAN });
          cache.writeQuery({
              query: QUERY_MEALPLAN,
              data: { MealPlans: [addMealPlan, ...MealPlan] },
          });
      } catch (e) {
          console.error(e);
      }
      const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, mealplans: [...me.mealplans, addMealPlan] } },
            });
    },
  });





    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const data = { prompt };
  
      try {
        const response = await axios.post("http://localhost:3005/chat", data);
        setResponse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    return(
        <div className='p-2 m-2'>
 <div className="container-fluid">
     
        <div className="p-5 text-center">
          <h4 className="col-12 mb-3" id="helpChatGPT">Please input your dietary rescritions in order to make a meal plan</h4>

          <form onSubmit={handleSubmit}>
            <textarea className="form-control text-center"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button type="submit" className="col-12 btn btn-main">
              Submit
            </button>

          </form>
          <br />
          {response &&
          <>
            <div className="col-12 mt-3">
              <pre className="response" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{response}</pre>
            </div>
            <button>Save?</button>
            </>
          }
        </div>

    </div>
        </div>
    )
}

export default ChatGPT