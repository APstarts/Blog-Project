import React from "react";
import axios from 'axios';
import FormComp from "../components/FormComp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();
    function handleLogin(data){
        const {email, password} = data;
        axios.post("http://localhost:5000/api/login", {email, password})
        .then(res => {
          // console.log(res);
          if(res.status === 200){
            localStorage.setItem("token", res.data.token);
            navigate("/feed");
          }
        })
        .catch(error => {
          if(error.status === 409){
            setResponseMessage(error.response.data.message);
          }
        })
    }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center dark:text-white">
      <FormComp formData={handleLogin} buttonText="Login" />
      {responseMessage && (
        <div className="dark:text-white p-2 border border-blue-500 mt-2">
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
