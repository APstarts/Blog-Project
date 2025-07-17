import React from "react";
import axios from 'axios';
import FormComp from "../components/FormComp";

function SignUp() {
    function handleLogin(data){
        const {email, name, surname, password} = data;
        axios.post("http://localhost:5000/api/register", {email, name, surname, password})
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center dark:text-white dark:bg-gray-950">
      <FormComp formData={handleLogin} buttonText="Sign Up" />
    </div>
  );
}

export default SignUp;
