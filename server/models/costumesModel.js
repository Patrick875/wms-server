const mongoose = require("mongoose");

const costumeSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: [true, "a cake must have a name"],
	},
	description: {
		type: String,
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "clothing",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "costumes",
	},
	bookingType: { type: String, default: "product" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},

	brand: {
		type: String,
	},
	size: {
		type: String,
		enum: {
			values: ["S", "M", "L", "XL"],
			message: "The range of sizes is small,medium,large and extra-large",
		},
	},
	images: [
		{
			type: String,
		},
	],
	price: {
		type: Number,
		required: [true, "Price for cake must be provided"],
	},
	quantity: {
		type: Number,
	},
});

const Costume = new mongoose.model("Costume", costumeSchema);

module.exports = Costume;
