const Invitation = require("../models/invitationModel");

exports.getAllInvitations = async (req, res) => {
	try {
		const invitations = await Invitation.find();
		res.status(200).json({
			status: "success",
			results: invitations.length,
			data: {
				invitations,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Error",
			message: {
				name: error.name,
				message: error.message,
			},
		});
	}
};
exports.getInvitation = async (req, res) => {
	try {
		const invitation = await Invitation.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				invitation,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Error",
			message: {
				name: error.name,
				message: error.message,
			},
		});
	}
};

exports.addInvitation = async (req, res) => {
	try {
		const newInvitation = await Invitation.create({ ...req.body });
		console.log(newInvitation);
		res.status(201).json({
			status: "success",
			data: {
				newInvitation,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: { err },
		});
	}
};
exports.updateInvitation = async (req, res) => {
	try {
		const invitation = await Invitation.findByIdAndUpdate(
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
				invitation,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Error",
			message: {
				name: error.name,
				message: error.message,
			},
		});
	}
};
exports.deleteInvitation = async (req, res) => {
	try {
		await Invitation.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			message: "deleted",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: "Error",
			message: {
				name: error.name,
				message: error.message,
			},
		});
	}
};
