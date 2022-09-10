//jshint esversion:9
const express = require("express");
const churchController = require("../controllers/churchController");
const router = express.Router();
const authController = require("./../controllers/authController");

router
	.route("/")
	.get(churchController.getAllChurchs)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		churchController.addChurch
	);
router
	.route("/:id")
	.get(churchController.getChurch)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		churchController.updateChurch
	)
	.delete(churchController.deleteChurch);

module.exports = router;
