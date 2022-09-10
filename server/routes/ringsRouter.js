//jshint esversion:9
const express = require("express");
const ringsController = require("../controllers/ringsController");
const router = express.Router();
const authController = require("./../controllers/authController");

router
	.route("/")
	.get(ringsController.getAllRings)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		ringsController.addRing
	);
router
	.route("/:id")
	.get(ringsController.getRing)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		ringsController.updateRing
	)
	.delete(ringsController.deleteRing);

module.exports = router;
