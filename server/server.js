const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: "didikwl4i",
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});
//catching uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION  🔥🔥🔥🔥 Shutting down...");
	console.log(err.name, err.message);
	process.exit(1);
});
process.on("unhandledRejection", (err) => {
	console.log("UNHANDELED REJECTION 🔥🔥🔥 Shutting down ...");
	console.log(err.name, err.message, err.stack);
	process.exit(1);
});

const PORT = process.env.PORT || 6000;
const DB = process.env.DATABASE_LOCAL;

//connecting to database

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((con) => {
		console.log("DB connection successful");
	})
	.catch((err) => {
		console.log(err.name, err.message);
	});

//connecting to server
app.listen(PORT, () => {
	console.log(`App connected at port ${PORT}`);
});
