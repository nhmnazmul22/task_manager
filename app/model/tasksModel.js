/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application Task Model
 * Late Update: no  Update here
 */

import mongoose from "mongoose";

// Define Task Schema
const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, require: true },
    user_id: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true, versionKey: false }
);


// Define Task Model
const Task = mongoose.model("tasks", TaskSchema);

// Export Task Model
export default Task;
