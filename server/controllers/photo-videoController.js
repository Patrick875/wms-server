const PhotoVideo = require("./../models/photo-videoModel");
exports.getAllPhotoVideos = async (req, res) => {
	const photosAndVideos = await PhotoVideo.find();
	res.status(200).json({
		status: "success",
		results: photosAndVideos.length,
		data: {
			photosAndVideos,
		},
	});
};
exports.getPhotoVideo = async (req, res) => {
	const photoVideo = await PhotoVideo.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			photoVideo,
		},
	});
};
exports.addPhotoVideo = async (req, res) => {
	const newPhotoVideo = await PhotoVideo.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newPhotoVideo,
		},
	});
};
exports.updatePhotoVideo = async (req, res) => {
	const newPhotoVideo = await PhotoVideo.findByIdAndUpdate(
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
			newPhotoVideo,
		},
	});
};
exports.deletePhotoVideo = async (req, res) => {
	await PhotoVideo.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
