//jshint esversion:9
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-multi-date-picker";
import { orderProduct } from "../redux/actions/orderActions";
import Payment from "./Payment";
import { addpayment } from "./../redux/actions/paymentActions";

import {
	setSelectedProduct,
	updateDatesAfterOrder,
} from "../redux/actions/productActions";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function BuyItemModal() {
	const product = useSelector((state) => state.product);
	// const daters = product.timeAvailable.map((date) =>
	// 	new Date(Number(date)).toLocaleDateString()
	// );
	// console.log(daters);
	const allProducts = useSelector((state) => state.allProducts.products);
	const format = "DD/MM/YY/HH:mm";
	let timeAvailable = product.timeAvailable
		? product.timeAvailable.map((date) => new Date(Number(date)))
		: [];
	// product.timeAvailable =
	// 	product.timeAvailable && product.timeAvailable.length !== 0
	// 		? product.timeAvailable.map((date) =>
	// 				Date(Number(date)).toLocaleDateString()
	// 		  )
	// 		: product.timeAvailable;
	const availableDates =
		product.timeAvailable && product.timeAvailable.length !== 0
			? product.timeAvailable
			: [];
	const [dates, setDates] = useState([...timeAvailable]);
	// console.log(
	// 	"okay",
	// 	timeAvailable.map((date) => date.toDate())
	// );
	const price = product.price;
	const user = useSelector((state) =>
		state.auth.user ? state.auth.user._id : null
	);
	const withQuantity = [
		"dress",
		"costumes",
		"cakes",
		"costumes",
		"shoes",
		"rings",
	];
	const isQuantity = product.bookingType === "product" ? true : false;
	const payment = useSelector((state) => state.payment.success);
	const {
		register,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(0);
	const cost = quantity * product.price || 0;
	const paymentConditions = [quantity];
	const disablePayment =
		isQuantity && dates.length !== 0
			? paymentConditions[0] === undefined
			: paymentConditions[1] === undefined || paymentConditions[1] === "---";

	const onSubmit = (data, user) => {
		data.subcategory = product.subcategory;
		data.itemName = product.name;
		data.itemId = product._id;
		data.itemPrice = product.price;
		data.quantity = quantity ? quantity : 1;
		data.itemImages = [product.thumbnail];
		//dates
		if (!withQuantity.includes(data.subcategory)) {
			if (product.timeAvailable.length !== 1) {
				data.timeRequested = dates[0].format();
			}
			data.timeRequested = dates[0];
			console.log(data);
			const remainingDates = product.timeAvailable.filter((date) =>
				date === data.timeRequested ? null : date
			);
			product.timeAvailable = remainingDates;
		}
		//payment and creating the order
		if (payment) {
			console.log("HERE,HAPA HAPA");
			dispatch(orderProduct(data));
			dispatch(updateDatesAfterOrder(product._id, data.timeRequested));
			dispatch(setSelectedProduct(product));
			dispatch(addpayment(false));
		}
	};
	let disableCheckout = false;
	if (isQuantity) {
		if (quantity === 0 || quantity === "") {
			disableCheckout = true;
		}
		if (quantity > product.quantity) {
			disableCheckout = true;
		}
	} else if (dates && dates.length === 0) {
		disableCheckout = true;
	}
	console.log("checkout disabling", disableCheckout);
	console.log("quantify", dates);
	return user ? (
		<div
			className="modal fade "
			id="exampleModal"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered modal-xl">
				<div className="modal-content ">
					<div className="modal-header mx-4">
						<h5
							className="modal-title text-center w-100"
							id="exampleModalLabel">
							Payment details
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div className="modal-body mx-4">
						<form
							className="row user-details"
							onSubmit={handleSubmit(onSubmit)}>
							<div className="col my-1">
								<p className="fw-bold">Product details</p>

								<div className=" d-flex flex-row mx-2">
									<div className="col-7">
										<img
											className="img-fluid"
											src={product.thumbnail}
											alt={product.name}
										/>
									</div>
									<div className="d-flex flex-column col ">
										<div className="">
											<p className=" fs-3">{product.name}</p>
											<p className=" text-muted text-capitalize">
												{product.subcategory}
											</p>
											<p className=" text-muted text-capitalize">
												price/unit {product.price} Rwf
											</p>
											{cost && cost !== 0 ? (
												<p className="fw-bolder text-muted text-capitalize">
													Cost {cost} Rwf
												</p>
											) : null}
										</div>
										{isQuantity ? (
											<div>
												<label htmlFor="quantity" className="py-2 fw-bolder">
													Quantity
												</label>
												<input
													id="quantity"
													name="quantity"
													placeholder="quantity"
													type="number"
													onChange={(e) => {
														setQuantity(e.target.value);
													}}
													min="0"
													required
													className="form-control"
												/>
												{quantity > product.quantity ? (
													<p>
														Not enough stock to accomodate your order. Please
														order items less than {product.quantity}
													</p>
												) : null}
											</div>
										) : null}

										{product.timeAvailable && !isQuantity ? (
											<div>
												<label htmlFor="quantity" className="py-2 fw-bolder">
													Select date and time
												</label>
												<DatePicker
													inputClass="form-control "
													multiple
													sort
													disableDayPicker={true}
													value={dates}
													format={format}
													onChange={setDates}
													calendarPosition="bottom-center"
													plugins={[<DatePanel />]}
												/>
											</div>
										) : null}
									</div>
								</div>
							</div>
							<div className="col-5 my-1 ">
								<div className="form-floating my-4">
									<textarea
										className="form-control"
										style={{ height: "10em" }}
										placeholder="Let us know for any comments"
										id="floatingTextarea"
										{...register("comments")}></textarea>
									<label htmlFor="floatingTextarea">Additional details</label>
								</div>
								<div className="my-3 py-2">
									<p className="fw-bold"> Disclaimer</p>
									<p>
										In case of leasing in item when the item is not returned on
										time the user might face penalty including but not limited
										to legal action on them as other pernalties as specified on
										our terms of use.
									</p>
								</div>
							</div>
							<div className="modal-footer mx-4">
								<button
									className="btn btn-primary"
									type="submit"
									disabled={disableCheckout}
									data-bs-dismiss="modal">
									<Payment
										product={product}
										disabled={disablePayment}
										cost={cost && cost !== 0 ? cost : price}>
										Checkout
									</Payment>
								</button>

								<button
									type="reset"
									className="btn btn-primary"
									data-bs-dismiss="modal">
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	) : null;
}

export default BuyItemModal;

//
// disable={(dates && dates.length !== 0) || isQuantity ? false : true}
