const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/new-user", upload.single("imageFile"), userController.createUser);
router.post("/authenticate-otp", userController.authenticateOtpApi);
router.get("/users/:id", userController.getUserById);
router.get("/users", userController.getUserByPhoneNumber);

module.exports = router;
