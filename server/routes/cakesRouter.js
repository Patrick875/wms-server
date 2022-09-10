//jshint esversion:9
const express = require("express");
const cakesController = require("./../controllers/cakesController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
	.route("/")
	.get(cakesController.getAllCakes)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		cakesController.addCake
	);
router
	.route("/:id")
	.get(cakesController.getCake)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		cakesController.updateCake
	)
	.delete(cakesController.deleteCake);

module.exports = router;
