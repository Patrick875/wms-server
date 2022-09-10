//jshint esversion:9
const express = require("express");
const router = express.Router();
const itoreroController = require("../controllers/itoreroController");

const authController = require("../controllers/authController");

router
	.route("/")
	.get(itoreroController.getAllItorero)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		itoreroController.createItorero
	);
router
	.route("/:id")
	.get(itoreroController.getItorero)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		itoreroController.updateItorero
	)
	.delete(itoreroController.deleteItorero);

module.exports = router;
