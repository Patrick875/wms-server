const Car = require("./../models/carsModel");

exports.getAllCars = async (req, res) => {
	const cars = await Car.find();
	res.status(200).json({
		status: "success",
		results: cars.length,
		data: {
			cars,
		},
	});
};
exports.getCar = async (req, res) => {
	const car = await Car.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			car,
		},
	});
};
exports.addCar = async (req, res) => {
	const newCar = await Car.create(req.body);
	res.status(201).json({
		status: "success",
		data: {
			newCar,
		},
	});
};
exports.updateCar = async (req, res) => {
	const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(203).json({
		status: "success",
		data: {
			car,
		},
	});
};
exports.deleteCar = async (req, res) => {
	await Car.findByIdAndDelete(req.params.id);
	res.status(204).json({
		status: "success",
		message: "deleted",
	});
};
