const express = require("express");
const decorationController = require("./../controllers/decorationController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
	.route("/")
	.get(decorationController.getAllDecorations)
	.post(
		authController.protect,
		authController.restrictTo("admin"),
		decorationController.addDecoration
	);
router
	.route("/:id")
	.get(decorationController.getDecoration)
	.patch(
		authController.protect,
		authController.restrictTo("admin"),
		decorationController.updateDecoration
	)
	.delete(decorationController.deleteDecoration);

module.exports = router;
