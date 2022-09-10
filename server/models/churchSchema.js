const mongoose = require("mongoose");

const churchSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "A church must have a name"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "A church must have a price"],
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "hospitality",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a subcategory"],
		default: "church",
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

const Church = new mongoose.model("Church", churchSchema);

module.exports = Church;
