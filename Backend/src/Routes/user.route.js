// Import necessary modules and middleware
import { Router } from "express";
import { login, register } from "../Controllers/auth.controller.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import {
  getControllers,
  getOverallWaterUsage,
  getUsers,
} from "../Controllers/admin.controller.js";
import {
  getUserWaterUsage,
  logWaterUsage,
} from "../Controllers/user.controller.js";
import {
  addController,
  getMyControllers,
  togglePump,
  updateControllerSettings,
} from "../Controllers/device.controller.js";

// Create an instance of Express Router
const router = Router();

/* -------------------- Public (Unprotected) Routes -------------------- */

// Register a new user
router.route("/user/register").post(register);

// Login an existing user
router.route("/user/login").post(login);

/* -------------------- Admin Routes (JWT Protected) -------------------- */

// Get a list of all users in the system
router.route("/admin/users").get(verifyJWT, getUsers);

// Get all registered controllers in the system
router.route("/admin/controllers").get(verifyJWT, getControllers);

// Get total/overall water usage from all users
router.route("/admin/waterUsage").get(verifyJWT, getOverallWaterUsage);

/* -------------------- User Water Usage Routes (JWT Protected) -------------------- */

// Log water usage data for the logged-in user
router.route("/user/logWaterUsage").post(verifyJWT, logWaterUsage);

// Get water usage data for the logged-in user
router.route("/user/waterUsage").get(verifyJWT, getUserWaterUsage);

/* -------------------- Controller Management Routes (JWT Protected) -------------------- */

// Get all controllers associated with the logged-in user
router.route("/user/controllers").get(verifyJWT, getMyControllers);

// Update controller settings (e.g., schedule, thresholds)
router
  .route("/user/controller/settings")
  .put(verifyJWT, updateControllerSettings);

// Toggle the water pump on/off
router.route("/user/controller/togglePump").post(verifyJWT, togglePump);

// Add/register a new controller device to the user's account
router.route("/user/controller/add").post(verifyJWT, addController);

// Export the router for use in the main app
export default router;
