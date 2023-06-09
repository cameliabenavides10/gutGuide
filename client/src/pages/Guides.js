import React from "react";
import ChatGPT from '../components/Ask';
import { QUERY_MEALPLAN, QUERY_ME, QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const Guides = () => {
 const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const mealPlans = data?.me?.mealPlans || [];

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

console.log(data);
console.log(mealPlans)





    return(
        <div className="d-flex align-items-center justify-content-center">
            <ChatGPT data={data}/>
        </div>
    )

}

export default Guides