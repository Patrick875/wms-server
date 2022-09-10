//jshint esversion:9
const express = require("express");
const photoVideoController = require("./../controllers/photo-videoController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(photoVideoController.getAllPhotoVideos)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		photoVideoController.addPhotoVideo
	);
router
	.route("/:id")
	.get(photoVideoController.getPhotoVideo)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		photoVideoController.updatePhotoVideo
	)
	.delete(photoVideoController.deletePhotoVideo);

module.exports = router;
