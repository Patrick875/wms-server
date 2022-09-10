const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
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
		default: "location",
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
		required: [true, "Price for cake must be provided"],
	},
	mapslink: String,
});

const Location = new mongoose.model("Location", locationSchema);

module.exports = Location;
