"use client";

import axios from "axios";
import React, { useState } from "react";
import "./styles.css";
  
const page = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

       const userId =   localStorage.getItem("userId")

      const { data } = await axios.post(`/api/task/create/${userId}`, formData);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create Task </h2>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="text"
          name="title"
          placeholder="Title Goes here "
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Decription goes here "
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Create Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default page;