const mongoose = require("mongoose");

const photoVideoSchema = mongoose.Schema({
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
		default: "camerawork",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a category"],
		default: "photography",
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
	price: {
		type: Number,
		required: [true, "Price for cake must be provided"],
	},
});

const PhotoVideo = new mongoose.model("PhotoVideo", photoVideoSchema);

module.exports = PhotoVideo;
