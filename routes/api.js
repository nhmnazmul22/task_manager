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
import authMiddleware from ".././app/middlewares/authMiddleware.js";
import * as taskController from "../app/controllers/taskController.js";
import * as userController from "../app/controllers/userController.js";
// initial express router
const router = express.Router();

// User Routers
router.post("/Register", userController.userRegistration);
router.post("/Login", userController.userLogin);
router.get("/Profile", authMiddleware, userController.userProfile);
router.post("/ProfileUpdate", authMiddleware, userController.updateProfile);
router.post("/VerifyEmail/:email", userController.verifyEmail);
router.post("/VerifyOTP", userController.verifyOTP);
router.post("/ResetPassword", userController.resetPassword);

// Task Routes
router.post("/CreateTask", authMiddleware, taskController.createTask);
router.post("/UpdateTask/:id", authMiddleware, taskController.updateTask);
router.get(
  "/ListTaskByStatus/:status",
  authMiddleware,
  taskController.listTaskByStatus
);
router.get("/CountTask", authMiddleware, taskController.countTask);
router.delete("/DeleteTask/:id", authMiddleware, taskController.deleteTask);

export default router;
