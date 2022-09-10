const mongoose = require("mongoose");

const invitationSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "An invitation must have a name"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	price: {
		type: Number,
		required: [true, "An invitation must have a price"],
	},
	category: {
		type: String,
		required: [true, "each product must have a category"],
		default: "hospitality",
	},
	subcategory: {
		type: String,
		required: [true, "each product must have a subcategory"],
		default: "invitation",
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

const Invitation = new mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;
