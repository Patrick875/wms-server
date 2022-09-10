const mongoose = require("mongoose");

const shoesSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: [true, "Shoes must have a name"],
	},
	description: {
		type: String,
	},
	type: {
		type: String,
		enum: {
			values: ["males", "females"],
			message: ["shoes can be males' or females'"],
		},
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "clothing",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "shoes",
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
	price: {
		type: Number,
		required: [true, "Price for cake must be provided"],
	},
});

const Shoes = new mongoose.model("Shoe", shoesSchema);

module.exports = Shoes;
