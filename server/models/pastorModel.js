const mongoose = require("mongoose");

const pastorSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "A pastor must have a name"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "A pastor must have a price"],
	},
	church: {
		type: String,
		required: [true, "A pastor must have a church"],
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "hospitality",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a subcategory"],
		default: "pastor",
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

const Pastor = new mongoose.model("Pastor", pastorSchema);

module.exports = Pastor;
