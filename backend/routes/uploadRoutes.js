import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import fs from "fs";

const router = express.Router();

// Upload product image to Cloudinary
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "shopverse_products",
    });

    fs.unlinkSync(req.file.path);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
