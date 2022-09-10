//jshint esversion:9
const express = require("express");
const invitationsController = require("../controllers/invitationController");
const router = express.Router();
const authController = require("./../controllers/authController");

router
	.route("/")
	.get(invitationsController.getAllInvitations)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		invitationsController.addInvitation
	);
router
	.route("/:id")
	.get(invitationsController.getInvitation)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		invitationsController.updateInvitation
	)
	.delete(invitationsController.deleteInvitation);

module.exports = router;
