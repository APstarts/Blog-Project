import React from "react";
import axios from 'axios';
import FormComp from "../components/FormComp";
import { useState } from "react";

function SignUp() {
  const [responseMessage, setResponseMessage] = useState(null);
    function handleLogin(data){
        const {email, name, surname, password} = data;
        axios.post("http://localhost:5000/api/register", {email, name, surname, password})
        .then(res => {
          if(res.status === 200){
            setResponseMessage(res.data.message);
          }
          if(res.status === 409){
            setResponseMessage(res.data.message);
          }
        })
        .catch(err => {
          if(err.response.status === 409) {
            setResponseMessage(err.response.data.message);
          };
        })
    }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center dark:text-white dark:bg-gray-950">
      <FormComp formData={handleLogin} buttonText="Sign Up" />
      {responseMessage && (<div className={"dark:text-white w-max border border-blue-500 p-2 mt-2"}>
        <p>{responseMessage}</p>
      </div>)}
    </div>
  );
}

export default SignUp;
