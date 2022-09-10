const mongoose = require("mongoose");

const bridesmaidSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "a bridesmaid must have a name"],
		trim: true,
	},
	description: {
		type: String,
	},
	age: Number,
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "bridesmaid",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "bridesmaid",
	},
	bookingType: { type: String, default: "service" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},
	timeAvailable: [{ type: String, required: true }],
	images: [
		{
			type: String,
		},
	],
	price: {
		type: Number,
		required: [true, "price must be provided"],
	},
});

const Bridesmaid = new mongoose.model("Bridesmaid", bridesmaidSchema);

module.exports = Bridesmaid;
