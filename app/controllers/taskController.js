/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application User Task Controller Functions
 * Late Update: 12/09/2024
 *
 */

import mongoose from "mongoose";
import Task from "../model/tasksModel.js";
import { tokenDecoded } from "../utility/tokenUtility.js";

export const createTask = async (req, res) => {
  try {
    const reqBody = req.body;
    const decoded = tokenDecoded(req.headers["token"]);
    await Task.create({
      ...reqBody,
      user_id: decoded.user_id,
    });
    return res.json({
      status: "Successful",
      message: "Task Create Successful",
    });
  } catch (err) {
    return res.json({ status: "Failed", message: err.toString() });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const user_id = req.headers.user_id;
    const reqBody = req.body;
    const data = await Task.findOne({ _id: taskId, user_id: user_id });
    if (data === null) {
      return res.json({ status: "Failed", message: "Task not found" });
    } else {
      await Task.updateOne({ _id: taskId, user_id: user_id }, reqBody);
      return res.json({
        status: "Successful",
        message: "Task Update Successful",
      });
    }
  } catch (err) {
    return res.json({ status: "Failed", message: err.toString() });
  }
};

export const listTaskByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const user_id = req.headers.user_id;
    const data = await Task.find({ user_id: user_id, status: status });
    if (data === null) {
      return res.json({ status: "Failed", message: "Tasks not found" });
    } else {
      return res.json({
        status: "Successful",
        data: data,
      });
    }
  } catch (err) {
    return res.json({ status: "Failed", message: err.toString() });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const user_id = req.headers.user_id;
    await Task.deleteOne({ _id: taskId, user_id: user_id });
    return res.json({
      status: "Successful",
      message: "Task Delete Successful",
    });
  } catch (err) {
    return res.json({ status: "Failed", message: err.toString() });
  }
};

export const countTask = async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const user_id = new ObjectId(req.headers.user_id);
    const data = await Task.aggregate([
      { $match: { user_id: user_id } },
      { $group: { _id: "$status", totalTask: { $count: {} } } },
    ]);
    return res.json({
      status: "Successful",
      message: "Task Count Successful",
      data: data,
    });
  } catch (err) {
    return res.json({
      status: "Failed",
      message: err.toString(),
    });
  }
};
