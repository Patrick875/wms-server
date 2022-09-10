const Flower = require("./../models/flowersModel");

exports.getAllFlowers = async (req, res) => {
	const flowers = await Flower.find();
	res.status(200).json({
		results: flowers.length,
		status: "success",
		data: {
			flowers,
		},
	});
};
exports.getFlower = async (req, res) => {
	const flower = await Flower.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			flower,
		},
	});
};
exports.addFlower = async (req, res) => {
	const newFlower = await Flower.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newFlower,
		},
	});
};
exports.updateFlower = async (req, res) => {
	const newFlower = await Flower.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			newFlower,
		},
	});
};
exports.deleteFlower = async (req, res) => {
	await Flower.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
