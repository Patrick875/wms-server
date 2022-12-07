//jshint esversion:9
const express = require("express");
const bandController = require("../controllers/bandController");
const imageUploader = require("../utils/imageUploader");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(bandController.getAllBands)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		bandController.addBand
	);

router
	.route("/:id")
	.get(bandController.getBand)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		bandController.updateBand
	)
	.delete(bandController.deleteBand);

module.exports = router;
