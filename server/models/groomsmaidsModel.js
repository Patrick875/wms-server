const mongoose = require("mongoose");

const groomsmaidSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: [true, "a cake must have a name"],
	},
	description: {
		type: String,
	},
	age: {
		type: Number,
		enum: {
			values: ["+20", "+30", "+40"],
			message: "The age can be +20,+30 or +40",
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
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "groomsmaids",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "groomsmaids",
	},
	bookingType: { type: String, default: "service" },
	thumbnail: {
		type: String,
		required: [true, "you need to provide a thumbnail image for the product"],
	},
	timeAvailable: [{ type: String, required: true }],
});

const Groomsmaid = new mongoose.model("Groomsmaid", groomsmaidSchema);

module.exports = Groomsmaid;
