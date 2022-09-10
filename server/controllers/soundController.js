const soundSystem = require("./../models/soundModel");

exports.getAllSoundsystems = async (req, res) => {
	const soundSystems = await soundSystem.find();
	res.status(200).json({
		results: soundSystems.length,
		status: "success",
		data: {
			soundSystems,
		},
	});
};
exports.getSoundsystem = async (req, res) => {
	const soundSystem = await SoundSytem.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			soundSystem,
		},
	});
};
exports.addSoundsystem = async (req, res) => {
	const newSoundSystem = await SoundSytem.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newSoundSystem,
		},
	});
};
exports.updateSoundsystem = async (req, res) => {
	const newSoundSystem = await SoundSystem.findByIdAndUpdate(
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
			newSoundSystem,
		},
	});
};
exports.deleteSoundsystem = async (req, res) => {
	await SoundSytem.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
