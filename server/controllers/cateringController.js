const Catering = require("./../models/cateringModel");

exports.getAllCaterings = async (req, res) => {
	const caterings = await Catering.find();
	res.status(200).json({
		status: "success",
		results: caterings.length,
		data: {
			caterings,
		},
	});
};
exports.getCatering = async (req, res) => {
	const catering = await Catering.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			catering,
		},
	});
};
exports.addCatering = async (req, res) => {
	const newCatering = await Catering.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newCatering,
		},
	});
};
exports.updateCatering = async (req, res) => {
	const catering = await Catering.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			catering,
		},
	});
};
exports.deleteCatering = async (req, res) => {
	await Catering.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
