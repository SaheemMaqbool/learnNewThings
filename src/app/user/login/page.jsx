"use client";

import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

const Login = () => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await axios.post("/api/user/login" , formData)
    localStorage.setItem("authToken" , data.payload)
    localStorage.setItem("userId" , data.userId)
    setMessage(data.message);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} method="post">
       
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;