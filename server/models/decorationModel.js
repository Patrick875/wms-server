const mongoose = require("mongoose");

const decorationSchema = mongoose.Schema({
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
		default: "band",
	},
	bookingType: { type: String, default: "service" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},

	images: [
		{
			type: String,
		},
	],
	location: {
		type: String,
		enum: {
			values: ["in-door", "out-door"],
			message: "select the kind of location for your wedding",
		},
	},
	price: {
		type: Number,
		required: [true, "Price for cake must be provided"],
	},
});

const Decoration = new mongoose.model("Decoration", decorationSchema);

module.exports = Decoration;
