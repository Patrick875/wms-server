const Band = require("../models/bandModel");

exports.getAllBands = async (req, res) => {
	const bands = await Band.find();
	res.status(200).json({
		status: "success",
		results: bands.length,
		data: {
			bands,
		},
	});
};
exports.getBand = async (req, res) => {
	const band = await Band.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			band,
		},
	});
};

exports.addBand = async (req, res) => {
	try {
		const newBand = await Band.create({ ...req.body });
		console.log(newBand);
		res.status(201).json({
			status: "success",
			data: {
				newBand,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: { err },
		});
	}
};
exports.updateBand = async (req, res) => {
	const band = await Band.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: false,
	});
	res.status(203).json({
		status: "success",
		data: {
			band,
		},
	});
};
exports.deleteBand = async (req, res) => {
	await Band.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
