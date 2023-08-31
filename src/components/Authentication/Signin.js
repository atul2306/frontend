

import React, { useState } from 'react';
import "./styles/signin.css"
import { NavLink } from 'react-router-dom';
import Signup from './Signup';

const Signin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        const response = await fetch(process.env.REACT_APP_API+'api/oauth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
        const responseData = await response.json()

        if (responseData.ok) {

            localStorage.setItem('token', responseData.token);
            localStorage.setItem('userDetails', JSON.stringify(responseData.userDetails));
            
          window.alert(responseData.message)
          window.location.href= "/blog/dashboard"
        } else {
            window.alert(responseData.message)
        }
      } catch (error) {
        console.error('An error occurred:', error);

      }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",marginBottom:"50px"}}>
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
    <Signup/>

    </div>
  );
};

export default Signin;
