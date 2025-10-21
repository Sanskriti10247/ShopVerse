import multer from "multer";

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png formats allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
