const Dj = require("./../models/djModel");

exports.getAllDjs = async (req, res) => {
	const djs = await Dj.find();
	res.status(200).json({
		status: "success",
		data: {
			djs,
		},
	});
};
exports.getDj = async (req, res) => {
	const dj = await Dj.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			dj,
		},
	});
};
exports.addDj = async (req, res) => {
	const newDj = await Dj.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newDj,
		},
	});
};
exports.updateDj = async (req, res) => {
	const newDj = await Dj.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			newDj,
		},
	});
};
exports.deleteDj = async (req, res) => {
	await Dj.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
