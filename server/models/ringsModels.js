const mongoose = require("mongoose");

const ringsSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "rings must have a name"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "Rings must have a price"],
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "clothing",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a subcategory"],
		default: "rings",
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
});

const Rings = new mongoose.model("ring", ringsSchema);

module.exports = Rings;
