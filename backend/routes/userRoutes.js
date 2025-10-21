import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  addAddress,
  deleteAddress, 
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router.put("/address", protect, addAddress); 
router.delete("/address", protect, deleteAddress); 

export default router;
