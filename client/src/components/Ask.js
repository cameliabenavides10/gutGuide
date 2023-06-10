import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QUERY_MEALPLAN, QUERY_ME, QUERY_USER } from '../utils/queries';
import { ADD_MEALPLAN } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const ChatGPT = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [mealPlanText, setMealPlanText] = useState('');


  const [addMealPlan, { error }] = useMutation(ADD_MEALPLAN, {
    update(cache, { data: { addMealPlan } }) {
      try {
        const { MealPlans } = cache.readQuery({ query: QUERY_MEALPLAN });
        cache.writeQuery({
          query: QUERY_MEALPLAN,
          data: { MealPlans: [addMealPlan, ...MealPlans] },
        });
        console.log("line 22 not error")
      } catch (e) {
        console.error(e);
        console.log("line 25 error")
      }
      const { me } = cache.readQuery({ query: QUERY_ME }) || { me: null };

      if (me) {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, mealPlans: [...me.mealPlans, addMealPlan] } },
        });
      };
    },
  });


  // storing mealplan response if client wants to db
  const handleListSubmit = async (event) => {
    event.preventDefault();

    try {
      await addMealPlan(
        {
          variables: {
            mealPlanText,
            mealPlanAuthor: Auth.getProfile().data.username,
          }
        }
      )
      setMealPlanText('')
      console.log("line 52")
    }
    catch (err) {
      console.log(err);
      console.log("line 56")
    }
  }

  console.log("hello" + mealPlanText)


  // useeffect whenever we get response back itll set mealplan to that
  const handleChange = () => {
    setMealPlanText(response)
  }
  useEffect(() => {
    handleChange();
  }, [response]);


  // handle submit for gpt3 api submit
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
  return (
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
              <form className="col-12 mt-3">
                <pre
                  name="mealPlan"
                  className="response"
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{response}
                  <br />
                  <button
                    onClick={handleListSubmit}
                  >
                    Save?
                  </button>
                </pre>

              </form>

            </>
          }
        </div>

      </div>
    </div>
  )
}

export default ChatGPT