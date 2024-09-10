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
import * as taskController from "../app/controllers/taskController.js";
import * as userController from "../app/controllers/userController.js";

// initial express router
const router = express.Router();

// User Routers
router.post("/Register", userController.userRegistration);
router.post("/Login", userController.userLogin);
router.post("/Profile", userController.userProfile);
router.post("/ProfileUpdate", userController.updateProfile);
router.post("/VerifyEmail", userController.verifyEmail);
router.post("/VerifyOTP", userController.verifyOTP);
router.post("/ResetPassword", userController.resetPassword);

// Task Routes
router.post("/CreateTask", taskController.createTask);
router.post("/UpdateTask", taskController.updateTask);
router.post("/ListTaskByStatus", taskController.listTaskByStatus);
router.post("/CountTask", taskController.countTask);
router.post("/DeleteTask", taskController.deleteTask);

export default router;
