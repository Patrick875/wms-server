//jshint esversion:9
const express = require("express");
const makeupController = require("./../controllers/makeupController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(makeupController.getAllMakeups)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		makeupController.addMakeup
	);
router
	.route("/:id")
	.get(makeupController.getMakeup)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		makeupController.updateMakeup
	)
	.delete(makeupController.deleteMakeup);

module.exports = router;
