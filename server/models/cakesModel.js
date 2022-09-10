const mongoose = require("mongoose");

const cakesSchema = mongoose.Schema({
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
		default: "cakes",
	},
	bookingType: { type: String, default: "product" },
	thumbnail: {
		type: String,
		//required: [true, "you need to provide a thumbnail image for the product"],
	},

	stock: {
		type: String,
		//required: [true, "provide the quantity of available products"],
	},

	price: {
		type: Number,
		required: [true, "Price for cake must be provided"],
	},
	images: [
		{
			type: String,
		},
	],
});

const Cake = new mongoose.model("Cake", cakesSchema);

module.exports = Cake;
