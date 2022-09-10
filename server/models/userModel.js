//jshint esversion:9
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
	names: {
		type: String,
		trim: true,
		required: [true, "a user must have a name"],
	},

	email: {
		type: String,
		unique: [true, "account already exists"],
		required: [true, "user must have an email"],
		validate: [validator.isEmail, "provide a valid email"],
	},
	telephone: {
		type: String,
		required: ["A user must provide their telephone number"],
		min: 10,
		max: 10,
		unique: [true, "telephone number is unique for each user"],
	},
	cart: mongoose.Schema.ObjectId,
	nationalId: {
		type: String,
		required: ["Please provide your nationalID number"],
		min: 16,
		max: 16,
	},
	password: {
		type: String,
		required: [true, "user must provide a password"],
		select: false,
	},
	confirmPassword: {
		type: String,
		required: [true, "user must confirm the password"],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Passwords must match",
		},
		select: false,
	},
	location: {
		address: String,
		city: String,
	},
	role: {
		type: String,
		enum: {
			values: ["user", "admin"],
			message: "user can admin or user only",
		},
		default: "user",
	},
	changedPasswordAt: Date,
	profileImage: [{ type: String }],
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) return next();
// 	this.password = await bcrypt.hash(this.password, 12);
// 	this.confirmPassword = undefined;
// });
userSchema.statics.accountExists = async function (signupData) {
	if (!signupData) throw new Error("invalid data");
	try {
		const user = await this.findOne({ telephone: signupData });
		if (user) return false;
		return true;
	} catch (error) {
		console.log("errorm in accountExists method", error.message);
		return false;
	}
};
// userSchema.methods.checkPassword = async function (
// 	enteredPassword,
// 	storedPassword
// ) {
// 	return await bcrypt.compare(enteredPassword, storedPassword);
// };
// userSchema.methods.checkChangedPasswords = function (tokenIssueTime) {
// 	console.log("HERE HERE");
// 	if (this.passwordChangedAt) {
// 		const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
// 		return JWTTimestamp < changedTimeStamp;
// 	}
// 	//false not change....
// 	return false;
// };

const User = new mongoose.model("User", userSchema);

module.exports = User;
