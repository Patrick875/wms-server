import React, { useState } from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { myDreamWeddingApi } from "../API/Api";
import CardGroup from "../components/CardGroup";
import Carousel from "../components/Carousel";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";

function Home() {
	const displayLoginPanel = useSelector(
		(state) => state.styles.login.displayLoginPanel
	);
	const displaySignupPanel = useSelector(
		(state) => state.styles.signup.displaySignupPanel
	);
	const displayLogedInUserPanel = useSelector(
		(state) => state.styles.userPanel.display
	);
	return (
		<div
			className={`${
				displayLoginPanel || displaySignupPanel || displayLogedInUserPanel
					? "displayLoginPanel"
					: ""
			}`}>
			<Layout>
				<Carousel />
				<CardGroup />
			</Layout>
		</div>
	);
}

export default Home;
// {
// 	<Gallery />;
// }
