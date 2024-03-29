import express from "express";
import {
  login,
  logout,
  register,
  loggedInUser,
  makeHashPass,
  activateUserByOTP,
  activateUserByLink,
} from "../controllers/authController.js";
import tokenVerify from "../middlewares/verifyToken.js";

const router = express.Router();

// create route
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/hash").post(makeHashPass);
router.route("/register").post(register);
router.route("/activate-user-by-opt").post(activateUserByOTP);
router.route("/activate-user-by-link/:token").post(activateUserByLink);

router.get("/me", tokenVerify, loggedInUser);

// export default router
export default router;
