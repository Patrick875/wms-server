//jshint esversion:9
const express = require("express");
const pastorsController = require("../controllers/pastorsController");
const router = express.Router();
const authController = require("./../controllers/authController");

router
	.route("/")
	.get(pastorsController.getAllPastors)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		pastorsController.addPastor
	);
router
	.route("/:id")
	.get(pastorsController.getPastor)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		pastorsController.updatePastor
	)
	.delete(pastorsController.deletePastor);

module.exports = router;
