const mongoose = require("mongoose");

const djSchema = mongoose.Schema({
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
		default: "sound",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "dj",
	},
	bookingType: { type: String, default: "service" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},
	timeAvailable: [{ type: String, required: true }],
	location: {
		type: String,
		enum: {
			values: ["in-door", "out-door"],
			message: "select the kind of location for your wedding",
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
});

const Dj = new mongoose.model("Dj", djSchema);

module.exports = Dj;
