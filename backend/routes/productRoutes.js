import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  updateProductReview,
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

router.route("/:id/reviews").post(protect, createProductReview);

router
  .route("/:id/reviews/:reviewId")
  .patch(protect, updateProductReview)
  .delete(protect, deleteProductReview);

router.route("/").post(protect, admin, createProduct);

router
  .route("/:id")
  .patch(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
