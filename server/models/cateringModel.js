const mongoose = require("mongoose");

const cateringSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: [true, "a cake must have a name"],
	},
	description: {
		type: String,
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
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "hospitality",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "catering",
	},
	bookingType: { type: String, default: "service" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},
});

const Catering = new mongoose.model("Catering", cateringSchema);

module.exports = Catering;
