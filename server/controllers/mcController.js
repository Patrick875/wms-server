const Mc = require("./../models/mcModel");

exports.getAllMcs = async (req, res) => {
	const mcs = await Mc.find();
	res.status(200).json({
		status: "success",
		results: mcs.length,
		data: {
			mcs,
		},
	});
};
exports.getMc = async (req, res) => {
	const mc = await Mc.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			mc,
		},
	});
};
exports.addMc = async (req, res) => {
	const newMc = await Mc.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newMc,
		},
	});
};
exports.updateMc = async (req, res) => {
	const newMc = await Mc.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			band,
		},
	});
};
exports.deleteMc = async (req, res) => {
	await Mc.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
