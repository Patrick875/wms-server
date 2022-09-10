const Shoe = require("../models/shoesModel");

exports.getAllShoes = async (req, res) => {
	const shoes = await Shoe.find();
	res.status(200).json({
		status: "success",
		data: {
			shoes,
		},
	});
};
exports.getShoe = async (req, res) => {
	const shoe = await Shoe.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			shoe,
		},
	});
};
exports.addShoe = async (req, res) => {
	const shoe = await Shoe.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			shoe,
		},
	});
};
exports.updateShoe = async (req, res) => {
	const shoe = await Shoe.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			shoe,
		},
	});
};
exports.deleteShoe = async (req, res) => {
	const shoe = await Shoe.findByIdAndUpdate(req.body.id, { active: false });
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
