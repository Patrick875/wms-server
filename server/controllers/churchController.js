const Church = require("../models/churchSchema");

exports.getAllChurchs = async (req, res) => {
	try {
		const churchs = await Church.find();
		res.status(200).json({
			status: "success",
			results: churchs.length,
			data: {
				churchs,
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
exports.getChurch = async (req, res) => {
	try {
		const church = await Church.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				church,
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

exports.addChurch = async (req, res) => {
	try {
		const newChurch = await Church.create({ ...req.body });
		console.log(newChurch);
		res.status(201).json({
			status: "success",
			data: {
				newChurch,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: { err },
		});
	}
};
exports.updateChurch = async (req, res) => {
	try {
		const church = await Church.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(203).json({
			status: "success",
			data: {
				church,
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
exports.deleteChurch = async (req, res) => {
	try {
		await Church.findByIdAndDelete(req.params.id);
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
