//jshint esversion:9

const {
	sendOrderConfirmationEmail,
	sendOrderApprovedEmail,
	sendOrderReceiptEmail,
} = require("../utils/sendEmail");
const { updateProductFromOrder } = require("../utils/updateAnyTable");
const Order = require("./../models/ordersModel");
const User = require("./../models/userModel");

exports.getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 });
		res.status(200).json({
			status: "success",
			data: {
				orders,
			},
		});
	} catch (err) {
		console.log(err.name, err.message);
		res.status(401).json({
			status: "fail",
			error: {
				name: err.name,
				message: err.message,
			},
		});
	}
};
exports.getAllOrdersByUser = async (req, res) => {
	const email = req.user.email;
	const user_id = req.params.user;
	try {
		const orders = await Order.find({ user_email: email });

		res.status(200).json({
			status: "success",
			data: {
				orders,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: {
				name: err.name,
				message: err.message,
			},
		});
	}
};
exports.getOrder = async (req, res) => {
	const order = await Order.findById(req.user);
	res.status(200).json({
		status: "success",
		data: {
			order,
		},
	});
};

exports.createOrder = async (req, res) => {
	let user = req.user;
	let userEmail = req.user.email;
	console.log("user-email", userEmail);
	//console.log("this is the order body", req.body);
	try {
		const newOrder = await Order.create({
			product: {
				category: req.body.category,
				subcategory: req.body.subcategory,
				id: req.body.itemId,
				name: req.body.itemName,
				price: req.body.itemPrice,
				quantity: req.body.quantity,
				timeRequested: req.body.timeRequested,
				createdAt: new Date(),
			},
			user_id: user._id,
			user_email: userEmail,
		});

		//email, username, productName;
		console.log("HERE");
		await sendOrderConfirmationEmail(
			req.user.email,
			req.user.names,
			req.body.itemName
		).catch((err) => {
			console.log("ORDER CONFIRMATION EMAIL NOT SENT");
			console.log(err.name, err.message);
		});

		//adding the category to the response for it be recognized while updating
		res.productSubcategory = req.body.subcategory;
		//updating product available dates and quantity after order
		await updateProductFromOrder(
			res,
			req.body.subcategory,
			req.body.itemId,
			req.body.timeRequested,
			req.body.quantity
		);
		res.status(201).json({
			status: "success",
			data: {
				newOrder,
			},
		});
	} catch (err) {
		console.log(err.name, err.message, err.stack);
		// res.status(400).json({
		// 	status: "fail",
		// 	data: { errName: err.name, err: err.message, errStack: err.stack },
		// });
	}
};

exports.updateOrder = async (req, res) => {
	console.log(req);
	try {
		const newOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		await sendOrderApprovedEmail(req.body.user_email).catch((err) => {
			console.log("ORDER ACTIVATED EMAIL NOT SENT");
			console.log(err.name, err.message);
		});
		const total = req.body.product.price * req.body.product.quantity;
		await sendOrderReceiptEmail(
			req.body.user_email,
			req.body.user_email,
			req.body.product.name,
			req.body.product.quantity,
			total
		).catch((err) => {
			console.log("ORDER CONFIRMATION EMAIL NOT SENT", { err });
		});
		res.status(203).json({
			status: "success",
			data: {
				newOrder,
			},
		});
	} catch (err) {
		console.log(err.name, err.message, err.stack);
		res.status(400).json({
			status: "fail",
			data: { errName: err.name, err: err.message, errStack: err.stack },
		});
	}
};

exports.deleteOrder = async (req, res) => {
	await Order.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
