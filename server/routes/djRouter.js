//jshint esversion:9
const express = require("express");
const djController = require("./../controllers/djController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(djController.getAllDjs)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		djController.addDj
	);
router
	.route("/:id")
	.get(djController.getDj)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		djController.updateDj
	)
	.delete(djController.deleteDj);

module.exports = router;
