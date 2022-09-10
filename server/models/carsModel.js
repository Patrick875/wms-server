const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Brand must be provided"],
	},
	description: {
		type: String,
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "hospitality",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "transport",
	},
	bookingType: { type: String, default: "product" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},

	price: {
		type: Number,
		required: [true, "price must be provided"],
	},
	color: {
		type: String,
	},
	images: [
		{
			type: String,
		},
	],
});

const Car = new mongoose.model("Car", carSchema);

module.exports = Car;
