const Pastor = require("../models/pastorModel");

exports.getAllPastors = async (req, res) => {
	try {
		const pastors = await Pastor.find();
		res.status(200).json({
			status: "success",
			results: pastors.length,
			data: {
				pastors,
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
exports.getPastor = async (req, res) => {
	try {
		const pastor = await Pastor.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				pastor,
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

exports.addPastor = async (req, res) => {
	try {
		const newPastor = await Pastor.create({ ...req.body });
		console.log(newPastor);
		res.status(201).json({
			status: "success",
			data: {
				newPastor,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: { err },
		});
	}
};
exports.updatePastor = async (req, res) => {
	try {
		const pastor = await Pastor.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(203).json({
			status: "success",
			data: {
				pastor,
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
exports.deletePastor = async (req, res) => {
	try {
		await Pastor.findByIdAndDelete(req.params.id);
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
