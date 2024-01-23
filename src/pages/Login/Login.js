import { useNavigate } from "react-router-dom";
import "./Login.css"
// import React from 'react'
import man from "../../asset/Comp 1_1.gif"

// import wave from "../../asset/wave.png"
import React, { useState } from 'react';

const Login = () => {
  const [randomString, setRandomString] = useState(generateRandomAlphabetic(8));

  function generateRandomAlphabetic(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  const handleRefreshCaptcha = () => {
    const newRandomString = generateRandomAlphabetic(8);
    setRandomString(newRandomString);
  };

  // Login process
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const { email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/lscchat/v1.0/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // Handle the response data here
      console.log('Response from server:', data);
      if (data.email != null) {
        navigate("/send")
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      // Handle errors, e.g., network errors or server errors
      console.error('Error:');
    }
  }
  return (
    <div className='main-login'>
      <div className='main-flex'>
        <div className='login-container'>
          <div style={{ width: '300px' }}>
            <div className='avatar'>
              {/* Replace with your avatar source */}
            </div>
            <h1 className="login-heading">Welcome Back</h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <input type="email" name="email" placeholder='Username' value={email} onChange={(e) => onInputChange(e)} /><br /><br />
              <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => onInputChange(e)} /><br /><br />
              <div id='capcha' className="capcha">
                <span id='captcha-letter' className="captcha-letter" style={{ letterSpacing: '6px' }}>{randomString}</span>
                <span id='refresh' onClick={handleRefreshCaptcha}>
                  <i className="fa-solid fa-rotate-right"></i>
                </span>
              </div><br />
              <input placeholder='Enter Captcha'></input><br /><br />
              <button className='button'>
                <span>Login</span>
              </button>
            </form>
          </div>
          <div className='image' style={{ width: '400px' }}>
            {/* <img src={man}></img>Replace with your gif source */} 

<dotlottie-player src="https://lottie.host/8cdb3906-6895-4bf4-b4f8-21e6a4eab54f/B2gOPWedUx.json" background="transparent" speed="1" style={{width: "400px", height: "400px"}} loop autoplay></dotlottie-player>


          </div>
        </div>
      </div>
      <div className="area" >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >
    </div>
  );
};

export default Login;
