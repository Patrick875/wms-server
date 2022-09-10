//jshint esversion:9
const express = require("express");
const singerController = require("../controllers/singerController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(singerController.getAllSingers)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		singerController.addSinger
	);
router
	.route("/:id")
	.get(singerController.getSinger)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		singerController.updateSinger
	)
	.delete(singerController.deleteSinger);

module.exports = router;
