const Itorero = require("../models/itoreroModal");

exports.getAllItorero = async (req, res) => {
	const itorero = await Itorero.find();
	res.status(200).json({
		status: "success",
		data: {
			itorero,
		},
	});
};
exports.getItorero = async (req, res) => {
	const itorero = await Itorero.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			itorero,
		},
	});
};
exports.updateItorero = async (req, res) => {
	const itorero = await Itorero.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			itorero,
		},
	});
};

exports.createItorero = async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			status: "fail",
			message: "Unauthorized, Login to get access",
		});
	}
	const itorero = await Itorero.create(req.body);
	res.status(200).json({
		status: "success",
		data: itorero,
	});
};

exports.deleteItorero = async (req, res) => {
	try {
		await Itorero.findByIdAndDelete(req.params.Itorero);
		res.status(204).json({
			status: "success",
			message: "Itorero deleted",
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: "failed deleting Itorero",
			error: {
				name: error.name,
				message: error.message,
			},
		});
	}
};
