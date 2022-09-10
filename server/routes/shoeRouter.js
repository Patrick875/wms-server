//jshint esversion:9
const express = require("express");
const shoeController = require("../controllers/shoeController");
const router = express.Router();
const authController = require("./../controllers/authController");

router
	.route("/")
	.get(shoeController.getAllShoes)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		shoeController.addShoe
	);
router
	.route("/:id")
	.get(shoeController.getShoe)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		shoeController.updateShoe
	)
	.delete(shoeController.deleteShoe);

module.exports = router;
