const Hairstyle = require("./../models/hairstyleModel");

exports.getAllHairstyles = async (req, res) => {
	const hairstyles = await Hairstyle.find();
	res.status(200).json({
		status: "success",
		results: hairstyles.results,
		data: {
			hairstyles,
		},
	});
};
exports.getHairstyle = async (req, res) => {
	const hairstyle = await Hairstyle.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			hairstyle,
		},
	});
};
exports.addHairstyle = async (req, res) => {
	const newHairstyle = await Hairstyle.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newHairstyle,
		},
	});
};
exports.updateHairstyle = async (req, res) => {
	const newHairstyle = await Hairstyle.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(203).json({
		status: "success",
		data: {
			newHairstyle,
		},
	});
};
exports.deleteHairstyle = async (req, res) => {
	await Hairstyle.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
