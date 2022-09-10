const Bridesmaid = require("./../models/bridesmaidsModel");

exports.getAllBridemaids = async (req, res) => {
	const bridesmaids = await Bridesmaid.find();
	res.status(200).json({
		status: "success",
		results: bridesmaids.length,
		data: {
			bridesmaids,
		},
	});
};
exports.getBridemaid = async (req, res) => {
	const bridemaid = await Bridesmaid(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			bridesmaid,
		},
	});
};
exports.addBridemaid = async (req, res) => {
	const bridesmaid = await Bridesmaid.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			bridesmaid,
		},
	});
};
exports.updateBridemaid = async (req, res) => {
	const bridesmaid = await Bridesmaid.findByIdAndUpdate(
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
			bridesmaid,
		},
	});
};
exports.deleteBridemaid = async (req, res) => {
	await Bridesmaid.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
