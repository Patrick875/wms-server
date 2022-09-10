//jshint esversion:9
const express = require("express");
const soundController = require("./../controllers/soundController");
const router = express.Router();
const authController = require("./../controllers/authController");

router
	.route("/")
	.get(soundController.getAllSoundsystems)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		soundController.addSoundsystem
	);
router
	.route("/:id")
	.get(soundController.getSoundsystem)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		soundController.updateSoundsystem
	)
	.delete(soundController.deleteSoundsystem);

module.exports = router;
