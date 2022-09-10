const mongoose = require("mongoose");

const soundSystemSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: [true, "a cake must have a name"],
	},
	description: {
		type: String,
	},
	style: {
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
	timeAvailable: [String],
	images: [
		{
			type: String,
		},
	],
	type: {
		type: String,

		price: {
			type: Number,
			required: [true, "Price for cake must be provided"],
		},
	},
});

const SoundSytem = new mongoose.model("SoundSystem", soundSystemSchema);

module.exports = SoundSytem;
