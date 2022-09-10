const mongoose = require("mongoose");

const flowerSchema = mongoose.Schema({
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
		default: "hospitality",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "flowers",
	},
	bookingType: { type: String, default: "product" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},

	images: [
		{
			type: String,
		},
	],
	weddingSize: {
		type: String,
	},
	price: {
		type: Number,
		required: [true, "Price for cake must be provided"],
	},
	weddingSize: {
		type: String,
		enum: {
			values: ["less than 100 guests", "less than 200", "more than 200"],
			message: "select from the options the wedding size",
		},
	},
});

const Flower = new mongoose.model("Flower", flowerSchema);

module.exports = Flower;
