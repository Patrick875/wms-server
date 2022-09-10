const User = require("./../models/userModel");

exports.updateMe = async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			status: "fail",
			message: "Unauthorized, Login to get access",
		});
	}
	const user = req.user;
	const { names, email, telephone, profileImage, location } = req.body;
	const updatedUser = await User.findByIdAndUpdate(
		user._id,
		{
			names,
			email,
			telephone,
			profileImage,
			location,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(203).json({
		status: "success",
		updatedUser,
	});
};
