const Dressing = require("./../models/dressingModel");

exports.getAllDressings = async (req, res) => {
	const dressings = await Dressing.find();
	res.status(200).json({
		status: "success",
		data: {
			dressings,
		},
	});
};
exports.getDressing = async (req, res) => {
	const dressing = await Dressing.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			dressing,
		},
	});
};
exports.addDressing = async (req, res) => {
	try {
		const newDressing = await Dressing.create(req.body);
		res.status(201).json({
			status: "success",
			data: {
				newDressing,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
exports.updateDressing = async (req, res) => {
	try {
		//const dressing = await Dressing.findById(req.params.id);
		console.log("the body we are updating", req.body);
		const newDressing = await Dressing.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(203).json({
			status: "success",
			data: {
				newDressing,
			},
		});
	} catch (err) {
		console.log(err.name, err.message);
	}
};
exports.deleteDressing = async (req, res) => {
	await Dressing.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
