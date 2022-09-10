const Singer = require("../models/singersModel");

exports.getAllSingers = async (req, res) => {
	const singers = await Singer.find();
	res.status(200).json({
		status: "success",
		results: singers.length,
		data: {
			singers,
		},
	});
};
exports.getSinger = async (req, res) => {
	const singer = await Singer.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			singer,
		},
	});
};

exports.addSinger = async (req, res) => {
	try {
		const newSinger = await Singer.create({ ...req.body });
		console.log(newSinger);
		res.status(201).json({
			status: "success",
			data: {
				newSinger,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: { err },
		});
	}
};
exports.updateSinger = async (req, res) => {
	const singer = await Singer.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			singer,
		},
	});
};
exports.deleteSinger = async (req, res) => {
	await Singer.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
