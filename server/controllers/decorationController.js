const Decoration = require("./../models/decorationModel");

exports.getAllDecorations = async (req, res) => {
	const decorations = await Decoration.find();
	res.status(200).json({
		status: "success",
		results: decorations.length,
		data: {
			decorations,
		},
	});
};
exports.getDecoration = async (req, res) => {
	const decoration = await Decoration.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			decoration,
		},
	});
};
exports.addDecoration = async (req, res) => {
	const newDecoration = await Decoration.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newDecoration,
		},
	});
};
exports.updateDecoration = async (req, res) => {
	const decoration = await Decoration.findByIdAndUpdate(
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
			decoration,
		},
	});
};
exports.deleteDecoration = async (req, res) => {
	await Decoration.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
