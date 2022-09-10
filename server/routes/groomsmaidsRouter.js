//jshint esversion:9
const express = require("express");
const groomsmaidsController = require("./../controllers/groomsmaidsController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(groomsmaidsController.getAllGroomsmaids)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		groomsmaidsController.addGroomsmaid
	);
router
	.route("/:id")
	.get(groomsmaidsController.getGroomsmaid)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		groomsmaidsController.updateGroomsmaid
	)
	.delete(groomsmaidsController.deleteGroomsmaid);

module.exports = router;
