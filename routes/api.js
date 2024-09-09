/**
 * Author: Nhm Nazmul
 * Date: 09/09/2024
 * File Name: Application Routing End points
 * Late Update: no  Update here
 *
 */

//External Imports
import express from "express";

//Internal Imports
import * as taskController from "../app/controllers/taskController";
import * as userController from "../app/controllers/userController";

// initial express router
const Router = express.Router();

// User Routers
Router.post("/Register", userController.userRegistration);
Router.post("/Login", userController.userLogin);
Router.post("/Profile", userController.userProfile);
Router.post("/ProfileUpdate", userController.updateProfile);
Router.post("/VerifyEmail", userController.verifyEmail);
Router.post("/VerifyOTP", userController.verifyOTP);
Router.post("/ResetPassword", userController.resetPassword);

// Task Routes
Router.post("/CreateTask", taskController.createTask);
Router.post("/UpdateTask", taskController.updateTask);
Router.post("/ListTaskByStatus", taskController.listTaskByStatus);
Router.post("/CountTask", taskController.countTask);
Router.post("/DeleteTask", taskController.deleteTask);
