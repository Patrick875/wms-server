//jshint esversion:9
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
//const { sendPasswordResetEmail } = require("../utils/sendEmail");
//const crypto = require("crypto");
//const bcrypt = req//uire("bcryptjs");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};
const sendToken = (user, statusCode, req, res) => {
	const token = signToken(user.id);
	const cookieOptions = {
		expire: new Date(Date.now()) + process.env.JWT_EXPIRATION_NUM,
		secure: process.env.NODE_ENV === "production" ? true : false,
		httpOnly: process.env.NODE_ENV === "production" ? true : false,
	};

	res.cookie("jwt", token, cookieOptions);
	user.password = undefined;
	res.status(statusCode).json({
		status: "Success",
		token,
		user,
	});
};
exports.signup = async (req, res, next) => {
	console.log(req.body);
	try {
		const isNewUser = await User.accountExists(req.body.telephone);
		console.log("verfiying telephone number", isNewUser);
		if (!isNewUser) {
			return res.status(401).json({
				success: false,
				message: "user Already exist please login",
			});
		}
		const newUser = await User.create({
			names: req.body.names,
			email: req.body.email,
			password: req.body.password,
			confirmPassword: req.body.confirmPassword,
			telephone: req.body.telephone,
			nationalId: req.body.nationalId,
			profileImage: req.body.profileImage,
			location: req.body.location,
		});

		sendToken(newUser, 201, req, res);
	} catch (err) {
		console.log(err.message);
		return res.status(401).json({
			status: "fail",
			error: {
				name: err.name,
				message: err.message,
			},
		});
	}
};
exports.login = async (req, res, next) => {
	const { password } = req.body;
	const userCredentials = req.body.user;
	if (!userCredentials || !password) {
		return res.status(401).json({
			status: "fail",
			message: "to login please provide both the email and the password",
		});
	}
	const user = await User.findOne({
		$or: [{ email: userCredentials }, { telephone: userCredentials }],
	}).select("+password");
	if (password !== user.password) {
		return res.status(400).json({
			status: "fail",
			message: "incorrect email or password",
		});
	}
	// if (!user || !(await user.checkPassword(password, user.password))) {
	// 	return res.status(400).json({
	// 		status: "fail",
	// 		message: "incorrect email or password",
	// 	});
	// }

	sendToken(user, 200, req, res);
};

exports.logout = (req, res) => {
	res.cookie("jwt", "", {
		maxAge: 300,
	});
	res.status(200).json({
		status: "success",
		message: "logedout",
	});
};

exports.protect = async (req, res, next) => {
	let token, decodedData;

	//1.check if token exists
	if (!req.cookies.jwt || !req.cookies.jwt === "") {
		return res.status(401).json({
			status: "fail",
			message: "you are not logged in please login to get access",
		});
	}
	token = req.cookies.jwt;
	//2.verify token
	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (err) {
			decoded = null;
			return res.status(401).json({
				stautus: "fail",
				message: err,
			});
		} else {
			decodedData = decoded;
		}
	});
	console.log(decodedData);
	const currentUser = await User.findById(decodedData.id);
	//3.check if user still exists
	if (!currentUser) {
		return res.status(401).json({
			status: "fail",
			message: "the user belonging to this token no longer exits",
		});
	}
	// 4.check if user changed passwords
	// if (currentUser.checkChangedPasswords(decodedData.iat)) {
	// 	return res.status(401).json({
	// 		status: "fail",
	// 		message: "user changed passowrd,loggin again",
	// 	});
	// }
	req.user = currentUser;
	next();
};
// exports.resetPassword = async (req, res) => {
// 	const hashedToken = crypto
// 		.createHash("sha256")
// 		.update(req.params.token)
// 		.digest("hex");
// 	const user = await User.findOne({
// 		passwordResetToken: hashedToken,
// 		passwordResetExpires: { $gt: Date.now() },
// 	});
// 	if (!user) {
// 		return res.status(400).json({
// 			status: "fail",
// 			message: "password reset failed",
// 		});
// 	}
// 	//2.if the token has not expired and there is user,set the new password
// 	user.password = req.body.password;
// 	user.passwordConfirm = req.body.passwordConfirm;
// 	user.passwordResetToken = undefined;
// 	user.passwordResetExpires = undefined;
// 	await user.save();
// };
exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		//roles is an array
		console.log("USER USER USER USER", req.user);
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				status: "fail",
				message: "You are not authorized to perform this action",
			});
		}
		next();
	};
};
