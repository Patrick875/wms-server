//jshint esversion:9
const express = require("express");
const hairstyleController = require("./../controllers/hairstyleController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(hairstyleController.getAllHairstyles)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		hairstyleController.addHairstyle
	);
router
	.route("/:id")
	.get(hairstyleController.getHairstyle)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		hairstyleController.updateHairstyle
	)
	.delete(hairstyleController.deleteHairstyle);

module.exports = router;
