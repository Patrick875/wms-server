const Makeup = require("./../models/makeupModel");

exports.getAllMakeups = async (req, res) => {
	const makeups = await Makeup.find();
	res.status(200).json({
		results: makeups.length,
		status: "success",
		data: {
			makeups,
		},
	});
};
exports.getMakeup = async (req, res) => {
	const makeup = await Makeup.find(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			makeup,
		},
	});
};
exports.addMakeup = async (req, res) => {
	const newMakeup = await Makeup.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newMakeup,
		},
	});
};
exports.updateMakeup = async (req, res) => {
	const newMakeup = await Makeup.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			newMakeup,
		},
	});
};
exports.deleteMakeup = async (req, res) => {
	await Makeup.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
