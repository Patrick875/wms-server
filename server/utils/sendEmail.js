const client = require("@sendgrid/mail");
const { format } = require("date-fns");

exports.sendOrderReceiptEmail = async (email, user, product, number, total) => {
	// dd/mm/yyyy format
	const now = new Date();
	let date = format(now, "dd/mm/yyyy");
	client.setApiKey(process.env.SENDGRID_API_KEY);
	console.log(email);
	try {
		await client.send({
			to: {
				email: email,
			},
			from: {
				email: process.env.SENDGRID_EMAIL_ADDRESS,
				name: "WEDDING MANAGEMENT SYSTEM",
			},
			templateId: "d-8379b45610e34c4d9d4d487cdc7666df",
			dynamicTemplateData: {
				email: email,
				name: user,
				item: product,
				number,
				total,
				date,
			},
		});
	} catch (error) {
		console.log({ error });
	}
};
exports.sendPasswordResetEmail = async (email, url) => {
	client.setApiKey(process.env.SENDGRID_API_KEY);
	await client.send({
		to: {
			email: email,
		},
		from: {
			email: process.env.SENDGRID_EMAIL_ADDRESS,
			name: "WEDDING MANAGEMENT SYSTEM",
		},
		templateId: "d-a3085ef6b2694b3e85464b9baec0ce95",
		dynamicTemplateData: {
			email: email,
			url: url,
		},
	});
};
exports.sendOrderConfirmationEmail = async (email, user, product) => {
	console.log(email);
	client.setApiKey(process.env.SENDGRID_API_KEY);
	await client
		.send({
			to: {
				email: email,
			},
			from: {
				email: process.env.SENDGRID_EMAIL_ADDRESS,
				name: "WEDDING MANAGEMENT SYSTEM",
			},
			templateId: "d-cb4a12f1c58447f38d3de044ecf931ef",
			dynamicTemplateData: {
				name: product,
				user: user,
			},
		})
		.catch((err) => {
			console.log(err.name, err.message);
			console.log("order email sent");
		});
};
exports.sendOrderApprovedEmail = async (email) => {
	client.setApiKey(process.env.SENDGRID_API_KEY);
	await client.send({
		to: {
			email: email,
		},
		from: {
			email: process.env.SENDGRID_EMAIL_ADDRESS,
			name: "WEDDING MANAGEMENT SYSTEM",
		},
		templateId: "d-c6d62984b1e945f1b217b1aae7781457",
	});
};
