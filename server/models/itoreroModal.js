const mongoose = require("mongoose");

const itoreroSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Itorero must have a name"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "A Itorero must have a price"],
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "sound",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "Itorero",
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
});

const Itorero = new mongoose.model("Itorero", itoreroSchema);

module.exports = Itorero;
