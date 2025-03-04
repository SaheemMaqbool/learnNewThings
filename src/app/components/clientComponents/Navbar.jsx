"use client";

import React, { useEffect, useState } from "react";
import "./styles.css";

const Navbar = () => {
  const [loggedIn, setloggedIn] = useState(false);


  useEffect(()=>{

    var token = localStorage.getItem("authToken")

    if(token){
      setloggedIn(true)
    }

  }, [])


  return (
    <div className="navbar">
      <div className="logo">Day-ToDay-Task </div>

      <ul>
        <li> {loggedIn && <a href="/user/task/getAll"> Tasks </a>} </li>

       <li> {loggedIn ? <a href="/user/task/create"> Create Task</a> : <a href="/user/login"> Login</a>}  </li> 
      </ul>
    </div>
  );
};

export default Navbar;