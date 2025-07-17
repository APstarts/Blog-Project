import React from "react";
import axios from 'axios';
import FormComp from "../components/FormComp";

function Login() {
    function handleLogin(data){
        const {email, password} = data;
        axios.post("http://localhost:3000/api/login", {email, password})
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center dark:text-white">
      <FormComp formData={handleLogin} buttonText="Login" />
    </div>
  );
}

export default Login;
