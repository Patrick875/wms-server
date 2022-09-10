const express = require("express");
const bridesmaidsController = require("./../controllers/bridesmaidsController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
	.route("/")
	.get(bridesmaidsController.getAllBridemaids)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		bridesmaidsController.addBridemaid
	);
router
	.route("/:id")
	.get(bridesmaidsController.getBridemaid)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		bridesmaidsController.updateBridemaid
	)
	.delete(bridesmaidsController.deleteBridemaid);

module.exports = router;
