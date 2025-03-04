"use client";

import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

const Register = () => {
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {data} = await axios.post("/api/user/register" , formData)
      localStorage.setItem("authToken" , data.payload)
      localStorage.setItem("userId" , data.userId)
      setMessage(data.message);
      
    } catch (error) {
      console.log(error)
    }
 
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
      
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
    
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
       
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;