//jshint esversion:9
const express = require("express");
const imageUploader = require("../utils/imageUploader");
const router = express.Router();
const costumesController = require("./../controllers/costumesController");
const authController = require("./../controllers/authController");

router
	.route("/")
	.get(costumesController.getAllCostumes)
	.post(
		authController.protect,
		imageUploader,
		authController.restrictTo("admin"),
		costumesController.addCostume
	);
router
	.route("/:costume_id")
	.get(costumesController.getCostume)
	.patch(
		authController.protect,
		imageUploader,
		authController.restrictTo("admin"),
		costumesController.updateCostume
	)
	.delete(costumesController.deleteCostume);

module.exports = router;
