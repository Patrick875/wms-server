const Rings = require("../models/ringsModels");

exports.getAllRings = async (req, res) => {
	try {
		const rings = await Rings.find();
		res.status(200).json({
			status: "success",
			results: rings.length,
			data: {
				rings,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Error",
			message: {
				name: error.name,
				message: error.message,
			},
		});
	}
};
exports.getRing = async (req, res) => {
	try {
		const ring = await Rings.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				ring,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Error",
			message: {
				name: error.name,
				message: error.message,
			},
		});
	}
};

exports.addRing = async (req, res) => {
	try {
		const newRing = await Rings.create({ ...req.body });
		console.log(newRing);
		res.status(201).json({
			status: "success",
			data: {
				newRing,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: { err },
		});
	}
};
exports.updateRing = async (req, res) => {
	try {
		const ring = await Rings.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(203).json({
			status: "success",
			data: {
				ring,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Error",
			message: {
				name: error.name,
				message: error.message,
			},
		});
	}
};
exports.deleteRing = async (req, res) => {
	try {
		await Rings.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			message: "deleted",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Error",
			message: {
				name: error.name,
				message: error.message,
			},
		});
	}
};
