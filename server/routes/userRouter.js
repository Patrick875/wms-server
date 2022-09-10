//jshint esversion:9
const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/logout", authController.logout);
// router.post("/forgotPassword", authController.forgotPassword);
// router.post("/resetPassword/:token", authController.resetPassword);
router.patch("/", authController.protect, userController.updateMe);

module.exports = router;
