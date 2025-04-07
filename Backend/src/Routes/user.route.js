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

const router = Router();

// non secure routes
router.route("/user/register").post(register);
router.route("/user/login").post(login);

// Admin Routes
router.route("/admin/users").get(verifyJWT, getUsers);
router.route("/admin/controllers").get(verifyJWT, getControllers);
router.route("/admin/waterUsage").get(verifyJWT, getOverallWaterUsage);

// Water Usage Routes (User)
router.route("/user/logWaterUsage").post(verifyJWT, logWaterUsage);
router.route("/user/waterUsage").get(verifyJWT, getUserWaterUsage);

// Controller Management Routes (User)
router.route("/user/controllers").get(verifyJWT, getMyControllers);
router
  .route("/user/controller/settings")
  .put(verifyJWT, updateControllerSettings);
router.route("/user/controller/togglePump").post(verifyJWT, togglePump);
router.route("/user/controller/add").post(verifyJWT, addController);

export default router;
