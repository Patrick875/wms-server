const mongoose = require("mongoose");

const hairstyleSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: [true, "a cake must have a name"],
	},
	description: {
		type: String,
	},
	style: {
		type: String,
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "makeup",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "hairstyle",
	},
	bookingType: { type: String, default: "service" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
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
});

const Hairstyle = new mongoose.model("Hairstyle", hairstyleSchema);

module.exports = Hairstyle;
