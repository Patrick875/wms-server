//jshint esversion:9
const express = require("express");
const mcController = require("./../controllers/mcController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(mcController.getAllMcs)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		mcController.addMc
	);
router
	.route("/:id")
	.get(mcController.getMc)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		mcController.updateMc
	)
	.delete(mcController.deleteMc);

module.exports = router;
