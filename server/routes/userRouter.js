//jshint esversion:9
const express = require("express");
const imageUploader = require("../utils/imageUploader");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", imageUploader, authController.signup);
router.get("/logout", authController.logout);
// router.post("/forgotPassword", authController.forgotPassword);
// router.post("/resetPassword/:token", authController.resetPassword);
router.patch(
	"/",
	authController.protect,
	imageUploader,
	userController.updateMe
);

module.exports = router;
