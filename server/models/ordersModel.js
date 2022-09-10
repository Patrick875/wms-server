const mongoose = require("mongoose");
const validator = require("validator");
const ordersSchema = mongoose.Schema({
	user_id: { type: mongoose.Schema.ObjectId },
	user_email: {
		type: String,
	},
	product: {
		id: mongoose.Schema.ObjectId,
		name: {
			type: String,
		},
		category: String,
		subcategory: String,
		price: Number,
		quantity: Number,
		timeRequested: String,
	},
	activated: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const Order = new mongoose.model("Order", ordersSchema);

module.exports = Order;
