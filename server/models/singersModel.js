const mongoose = require("mongoose");

const singerSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "A Singer must have a name"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "A Singer must have a price"],
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "sound",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a subcategory"],
		default: "Singer",
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

const Singer = new mongoose.model("Singer", singerSchema);

module.exports = Singer;
