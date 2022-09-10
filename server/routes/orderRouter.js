const express = require("express");
const authController = require("./../controllers/authController");
const ordersController = require("./../controllers/orderController");
const router = express.Router();

router.get(
	"/:user/",
	authController.protect,
	ordersController.getAllOrdersByUser
);
router
	.route("/")
	.get(authController.protect, ordersController.getAllOrders)
	.post(authController.protect, ordersController.createOrder);
router
	.route("/:id")
	.get(ordersController.getOrder)
	.patch(ordersController.updateOrder)
	.delete(ordersController.deleteOrder);

module.exports = router;
