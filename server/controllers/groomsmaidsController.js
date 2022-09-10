const Groomsmaid = require("./../models/groomsmaidsModel");

exports.getAllGroomsmaids = async (req, res) => {
	const groomsmaids = await Groomsmaid.find();
	res.status(200).json({
		status: "success",
		data: {
			groomsmaids,
		},
	});
};
exports.getGroomsmaid = async (req, res) => {
	const groomsmaid = await Groomsmaid.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			groomsmaid,
		},
	});
};
exports.addGroomsmaid = async (req, res) => {
	const newGroomsmaid = await Groomsmaid.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newGroomsmaid,
		},
	});
};
exports.updateGroomsmaid = async (req, res) => {
	const newGroomsmaid = await Groomsmaid.findByIdAndUpdate(
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
			newGroomsmaid,
		},
	});
};
exports.deleteGroomsmaid = async (req, res) => {
	await Groomsmaid.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
