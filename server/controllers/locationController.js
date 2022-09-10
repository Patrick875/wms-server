const Location = require("./../models/locationModel");

exports.getAllLocations = async (req, res) => {
	const locations = await Location.find();
	res.status(200).json({
		status: "success",
		results: locations.length,
		data: {
			locations,
		},
	});
};
exports.getLocation = async (req, res) => {
	const location = await Location.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			location,
		},
	});
};
exports.addLocation = async (req, res) => {
	const newLocation = await Location.create(req.body);
	try {
		res.status(201).json({
			status: "success",
			data: {
				newLocation,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			error: {
				name: error.name,
				message: error.message,
			},
		});
	}
};
exports.updateLocation = async (req, res) => {
	const newLocation = await Location.findByIdAndUpdate(
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
			newLocation,
		},
	});
};
exports.deleteLocation = async (req, res) => {
	await Location.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
