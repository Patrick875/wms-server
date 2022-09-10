const mongoose = require("mongoose");

const dressingSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: [true, "a cake must have a name"],
	},
	description: {
		type: String,
	},
	brand: {
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
		default: "dress",
	},
	bookingType: { type: String, default: "product" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},
	lastTimeAvailable: String,
	timeAvailable: [String],
	images: [
		{
			type: String,
		},
	],
	quantity: Number,
	price: {
		type: Number,
		required: [true, "Price for cake must be provided"],
	},
});

const Dressing = new mongoose.model("Dressing", dressingSchema);

module.exports = Dressing;
