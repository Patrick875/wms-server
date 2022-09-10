//jshint esversion:9
const express = require("express");
const flowerController = require("./../controllers/flowersController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(flowerController.getAllFlowers)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		flowerController.addFlower
	);
router
	.route("/:id")
	.get(flowerController.getFlower)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		flowerController.updateFlower
	)
	.delete(flowerController.deleteFlower);

module.exports = router;
