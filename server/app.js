//jshint esversion:9
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
	"sk_test_51Kbo4vJdw4sFRmjhwcSL177AY9NqKzwk3OSjh87ZgUepFO1HLQWoksoFEDODPvOfMxYlTWLXw2zxQv2ViXCYylJ500nhpXAly4"
);

const cookieParser = require("cookie-parser");
const bandRouter = require("./routes/bandRouter");
const bridesmaidsRouter = require("./routes/bridesmaidsRouter");
const cakesRouter = require("./routes/cakesRouter");
const carsRouter = require("./routes/carsRouter");
const cateringRouter = require("./routes/cateringRouter");
const shoeRouter = require("./routes/shoeRouter");
const costumesRouter = require("./routes/costumesRouter");
const decorationRouter = require("./routes/decorationRouter");
const dressRouter = require("./routes/dressingRouter");
const flowersRouter = require("./routes/flowersRouter");
const djRouter = require("./routes/djRouter");
const groomsmaidsRouter = require("./routes/groomsmaidsRouter");
const hairstyleRouter = require("./routes/hairstyleRouter");
const locationRouter = require("./routes/locationRouter");
const makeupRouter = require("./routes/makeupRouter");
const mcRouter = require("./routes/mcRouter");
const photoVideoRouter = require("./routes/photoVideoRouter");
const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");
const itoreroRouter = require("./routes/itoreroRoutes");
const singerRouter = require("./routes/singerRouter");
const ringsRouter = require("./routes/ringsRouter");
const pastorsRouter = require("./routes/pastorsRoutes");
const churchsRouter = require("./routes/churchsRoutes");
const invitationsRouter = require("./routes/invitationsRoutes");

const app = express();
const cors = require("cors");
//middleware

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(helmet());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/band", bandRouter);
app.use("/api/v1/bridesmaids", bridesmaidsRouter);
app.use("/api/v1/groomsmaids", groomsmaidsRouter);
app.use("/api/v1/cakes", cakesRouter);
app.use("/api/v1/cars", carsRouter);
app.use("/api/v1/catering", cateringRouter);
app.use("/api/v1/shoe", shoeRouter);
app.use("/api/v1/itorero", itoreroRouter);
app.use("/api/v1/costumes", costumesRouter);
app.use("/api/v1/flowers", flowersRouter);
app.use("/api/v1/dress", dressRouter);
app.use("/api/v1/decoration", decorationRouter);
app.use("/api/v1/dj", djRouter);
app.use("/api/v1/hairstyles", hairstyleRouter);
app.use("/api/v1/location", locationRouter);
app.use("/api/v1/makeup", makeupRouter);
app.use("/api/v1/mc", mcRouter);
app.use("/api/v1/photoandvideo", photoVideoRouter);
app.use("/api/v1/church", churchsRouter);
app.use("/api/v1/pastor", pastorsRouter);
app.use("/api/v1/rings", ringsRouter);
app.use("/api/v1/singer", singerRouter);
app.use("/api/v1/invitation", invitationsRouter);

app.post("/api/v1/payments", async (req, res) => {
	let error, status;
	try {
		const { product, token } = req.body;
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});
		const idempotencyKey = uuidv4();
		const charge = await stripe.charges.create(
			{
				amount: product.price * 100,
				currency: "RWF",
				customer: customer.id,
				receipt_email: token.email,
				description: `Purchased the ${product.name}`,
				shipping: {
					name: token.card.name,
					address: {
						line1: token.card.address_line1,
						line2: token.card.address_line2,
						city: token.card.address_city,
						country: token.card.address_country,
						postal_code: token.card.address_zip,
					},
				},
			},
			{
				idempotencyKey,
			}
		);

		status = "success";
	} catch (error) {
		console.error("Error:", error);
		status = "failure";
	}

	res.json({ error, status });
});
app.post("/api/v1/create-checkout-session", async (req, res) => {
	const item = req.body;
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "RWF",
						product_data: {
							name: item.itemName,
							images: item.itemImages,
						},
						unit_amount: item.itemPrice,
					},
					quantity: item.quantity,
				},
			],
			success_url: "http://localhost:3000/",
			cancel_url: "http://localhost:3000/",
		});
		res.json({
			url: session.url,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			error: {
				name: err.name,
				message: err.message,
			},
		});
	}
});
app.all("*", (req, res, next) => {
	res.status(404).json({
		status: "Fail",
		message: `Can't find ${req.originalUrl} on this server`,
	});
});

module.exports = app;
