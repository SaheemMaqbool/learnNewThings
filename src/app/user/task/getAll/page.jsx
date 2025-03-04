"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { MdCloudDone } from "react-icons/md";

import { toast } from "react-toastify";

const GetAll = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    try {
      setLoading(true)

      const userId =   localStorage.getItem("userId")
      const { data } = await axios.get(`/api/task/getAll/${userId}`);

      setTasks(data.payload);
    } catch (error) {
      console.log(error);
    }
    finally{
      setTimeout(() => {
        setLoading(false)
      }, 3000);
     
    }
  };

  const handleProgress = async (taskId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/task/inProgress/${taskId}`);
      toast.success(data.message);
      await getTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompletion = async (taskId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/task/complete/${taskId}`);
      toast.success(data.message);
      await getTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/task/delete/${taskId}`);
      toast.success(data.message);
      await getTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">

    {loading ? <div className="loading">   Loading ..... </div> :

      <div className="tasks">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="task">
              <div className="heading">
                <h1> {task.title} </h1>
                <span className="pending">
                  {task.status === "pending" && <MdOutlinePendingActions />}
                  <span>
                    {" "}
                    {task.status === "pending" && "Task is pending"}{" "}
                  </span>
                </span>

                <span className="progress">
                  {task.status === "inProgress" && <GrInProgress />}
                  <span>
                    {" "}
                    {task.status === "inProgress" && "Task is in Progress"}{" "}
                  </span>
                </span>

                <span className="completed">
                  {task.status === "complete" && <MdCloudDone />}
                  <span>
                    {" "}
                    {task.status === "complete" && "Task completed"}{" "}
                  </span>
                </span>
              </div>

              <h4> {task.description}</h4>

              {/* {task.status === "complete" ? <button>Edit</button> : <button>Edit</button>} */}

              {task.status === "pending" ? (
                <button
                  onClick={() => {
                    handleProgress(task._id);
                  }}
                >
             
                 Start Working on this Task
                </button>
              ) : task.status === "inProgress" ? (
                <button
                  onClick={() => {
                    handleCompletion(task._id);
                  }}
                >
               
                  Task Completed{" "}
                </button>
              ) : task.status == "complete" ? (
                <button
                  onClick={() => {
                    handleDelete(task._id);
                  }}
                >
                  Delete
                </button>
              ) : null}
            </div>
          ))
        ) : (
          <div className="no-task-found">
            <h3> No tasks Found </h3>
          </div>
        )}
      </div>

      }

    </div>
  );
};

export default GetAll;