import types from "next/types";

const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    status: {
      type: String,
      enum: ["pending", "inProgress", "completed", "deleted"],
      default: "pending",
    },
    dueTime: { type: Date },
  },

  {
    timestamps: true,
  }
);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);