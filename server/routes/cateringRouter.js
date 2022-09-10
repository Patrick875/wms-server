const express = require("express");
const cateringController = require("./../controllers/cateringController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
	.route("/")
	.get(cateringController.getAllCaterings)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		cateringController.addCatering
	);
router
	.route("/:id")
	.get(cateringController.getCatering)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		cateringController.updateCatering
	)
	.delete(cateringController.deleteCatering);

module.exports = router;
