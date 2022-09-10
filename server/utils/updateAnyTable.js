//jshint esversion:9
const band = require("./../models/bandModel");
const bridesmaids = require("./../models/bridesmaidsModel");
const cake = require("./../models/cakesModel");
const cars = require("./../models/carsModel");
const catering = require("./../models/cateringModel");
const shoes = require("./../models/shoesModel");
const costumes = require("./../models/costumesModel");
const decoration = require("./../models/decorationModel");
const dj = require("./../models/djModel");
const dress = require("./../models/dressingModel");
const flowers = require("./../models/flowersModel");
const groomsmaids = require("./../models/groomsmaidsModel");
const hairstyle = require("./../models/hairstyleModel");
const location = require("./../models/locationModel");
const makeup = require("./../models/makeupModel");
const mc = require("./../models/mcModel");
const sound = require("./../models/soundModel");
const rings = require("./../models/ringsModels");
const singer = require("./../models/itoreroModal");
const itorero = require("./../models/singersModel");
const photoVideo = require("./../models/photo-videoModel");

async function update(res, model, productId, date, quantity) {
	const mydate = date;
	let timeAvailable;
	//console.log("this is the res", res);
	try {
		const product = await model.findById(productId);
		console.log("product before update", product);
		if (product.timeAvailable && product.timeAvailable.length !== 0) {
			timeAvailable = product.timeAvailable.filter((date) =>
				date === mydate ? null : date
			);
		}

		if (
			["dress", "shoes", "costumes", "rings"].includes(res.productSubcategory)
		) {
			product.quantity = product.quantity - quantity;
		}
		console.log("THIS IS THE REMAINING TIMEAVAILABLE", timeAvailable);
		product.timeAvailable = timeAvailable;
		console.log("the product after order", product);
		return await product.save();
	} catch (err) {
		console.log(err);
		return err;
	}
}

exports.updateProductFromOrder = async (
	res,
	subcategory,
	productId,
	date,
	quantity
) => {
	console.log("here we are", date);
	switch (subcategory) {
		case "location":
			return update(res, location, productId, date);
		case "band":
			return update(res, band, productId, date);
		case "catering":
			return update(res, catering, productId, date);
		case "cakes":
			return update(res, cake, productId, date);
		case "singer":
			return update(res, singer, productId, date);
		case "decoration":
			return update(res, decoration, productId, date);
		case "makeup":
			return update(res, makeup, productId, date);
		case "flowers":
			return update(res, flowers, productId, date);
		case "dress":
			return update(res, dress, productId, date, quantity);
		case "costumes":
			return update(res, costumes, productId, date);
		case "bridesmaids":
			return update(res, bridesmaids, productId, date);
		case "groomsmaids":
			return update(res, groomsmaids, productId, date);
		case "photography":
			return update(res, photoVideo, productId, date);
		case "videography":
			return update(res, photoVideo, productId, date);
		case "transport":
			return update(res, cars, productId, date);
		case "dj":
			return update(res, dj, productId, date);
		case "shoe":
			return update(res, shoes, productId, date);
		case "rings":
			return update(res, rings, productId, date);
		case "itorero":
			return update(res, itorero, productId, date);
		case "hairstyle":
			return update(res, hairstyle, productId, date);
		case "mc":
			return update(res, mc, productId, date);
		default:
			break;
	}
};
