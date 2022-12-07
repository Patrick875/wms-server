const imageUploader = require("../utils/imageUploader");
const Costume = require("./../models/costumesModel");

exports.getAllCostumes = async (req, res) => {
	const costumes = await Costume.find();
	res.status(200).json({
		status: "success",
		results: costumes.length,
		data: {
			costumes,
		},
	});
};
exports.getCostume = async (req, res) => {
	const costume = await Costume.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			costume,
		},
	});
};
exports.addCostume = async (req, res, next) => {
	try {
		const newCostume = await Costume.create(req.body);
		res.status(201).json({
			status: "success",
			data: {
				newCostume,
			},
		});
		console.log(req);
	} catch (error) {
		console.log({ error: error.name, errorMessage: error.message });
		res.status(400).json({
			status: "fail",
			message: "error add a new costume",
		});
	}
};
exports.updateCostume = async (req, res) => {
	const costume = await Costume.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			costume,
		},
	});
};
exports.deleteCostume = async (req, res) => {
	await Costume.findByIdAndDelete(req.params.costume_id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
