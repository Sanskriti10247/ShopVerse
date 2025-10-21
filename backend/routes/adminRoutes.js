import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllOrders,
  markOrderDelivered,
  deleteProduct,
  updateProduct,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.route("/users").get(protect, admin, getAllUsers);
router.route("/users/:id").delete(protect, admin, deleteUser);
router.route("/orders").get(protect, admin, getAllOrders);
router.route("/orders/:id/deliver").put(protect, admin, markOrderDelivered);
router.route("/products/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
