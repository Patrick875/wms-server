const Cake = require("./../models/cakesModel");

exports.getAllCakes = async (req, res) => {
	const cakes = await Cake.find();
	res.status(200).json({
		status: "success",
		results: cakes.length,
		data: {
			cakes,
		},
	});
};
exports.getCake = async (req, res) => {
	const cake = await Cake.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			cake,
		},
	});
};
exports.addCake = async (req, res) => {
	const newCake = await Cake.create({ ...req.body });
	res.status(201).json({
		status: "success",
		data: {
			newCake,
		},
	});
};
exports.updateCake = async (req, res) => {
	const newCake = await Cake.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			newCake,
		},
	});
};
exports.deleteCake = async (req, res) => {
	await Cake.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
