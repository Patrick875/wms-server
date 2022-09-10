const express = require("express");
const carsController = require("./../controllers/carsController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(carsController.getAllCars).post(
	authController.protect,
	authController.restrictTo("admin"),

	carsController.addCar
);
router
	.route("/:id")
	.get(carsController.getCar)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),

		carsController.updateCar
	)
	.delete(carsController.deleteCar);

module.exports = router;
