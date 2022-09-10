//jshint esversion:9
const express = require("express");
const dressingController = require("./../controllers/dressingController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
	.route("/")
	.get(dressingController.getAllDressings)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		dressingController.addDressing
	);
router
	.route("/:id")
	.get(dressingController.getDressing)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		dressingController.updateDressing
	)
	.delete(dressingController.deleteDressing);

module.exports = router;
