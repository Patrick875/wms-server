//jshint esversion:9
const express = require("express");
const locationsController = require("./../controllers/locationController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(locationsController.getAllLocations)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		locationsController.addLocation
	);
router
	.route("/:id")
	.get(locationsController.getLocation)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		locationsController.updateLocation
	)
	.delete(locationsController.deleteLocation);

module.exports = router;
