import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myDreamWeddingApi } from "../../API/Api";
import {
	useStripe,
	cardElement,
	useElements,
	CardElement,
} from "@stripe/react-stripe-js";

export default function StripePay() {
	const [nameOnCard, setNameOnCard] = useState("");
	const stripe = useStripe();
	const dispatch = useDispatch();

	const description = "purchase from <blank> store";
	const onNameonCart = (e) => {
		setNameOnCard(e.target.value);
	};

	// myDreamWeddingApi;
	return (
		<form className="stripe-pay">
			<div className="stripe__title">Checkout</div>
			<div className="stripe__grid">
				<div className="stripe__row">
					<input
						name="nameoncard"
						className="stripe-pay__raw-input"
						type="text"
						value={nameOnCard}
						onChange={(e) => onNameonCart(e)}
						placeholder="name"
						required={true}
					/>
				</div>
				<div className="stripe__row">
					<CardElement
						options={{
							style: {
								base: {
									fontSize: "16px",
									":placeholder": {
										color: "#aab7c4",
										fontFamily: "sans-serif",
									},
								},
								invalid: {
									color: "e9327c",
								},
							},
						}}
					/>
				</div>
			</div>
			<div className="stripe-pay__raw stripe-pay__raw-radio">
				<div className="radio radio-fill">use saved card</div>
				<div className="radio">Save card</div>
			</div>
			<div className="stripe-pay__raw">
				<button className="stripe-pay__button">Pay</button>
			</div>
		</form>
	);
}
