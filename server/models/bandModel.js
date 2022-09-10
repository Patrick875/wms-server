const mongoose = require("mongoose");

const bandSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "A band must have a name"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "A band must have a price"],
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "sound",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a subcategory"],
		default: "band",
	},
	bookingType: { type: String, default: "service" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},
	timeAvailable: [String],

	images: [
		{
			type: String,
		},
	],
});

const Band = new mongoose.model("Band", bandSchema);

module.exports = Band;
