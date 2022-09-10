import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BuyItemModal from "../components/BuyItemModal";
import { myDreamWeddingApi } from "../API/Api";
import { toast } from "react-toastify";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

function CustomNotification({ closeToast }) {
	return (
		<div className="card">
			sawa
			<i className="ri-close-line ri-2x" role="button"></i>
		</div>
	);
}
function disable(auth, availableDates, quantity, name, isToService) {
	if (auth === false) {
		return {
			value: true,
			message: `Login to order ${name}`,
		};
	} else if (isToService) {
		if (availableDates.length === 0) {
			return {
				value: true,
				message: `${name} i not available for order as all dates have been picked`,
			};
		}
	} else if (quantity === 0) {
		return {
			value: true,
			message: `Out of stock for ${name}`,
		};
	} else {
		return false;
	}
}
function ItemPage() {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const [selectedImage, setSelectedImage] = useState();
	const product = useSelector((state) => state.product);
	const isAuth = useSelector((state) => state.auth.isAuth);
	const orders = useSelector((state) => state.orders.orders);
	const images = product.images.length !== 0 ? product.images : [];
	const availableDates = product.timeAvailable;
	console.log(orders);
	const isBooked =
		orders && orders.length > 0
			? orders.filter((order) =>
					order.product.id === product._id ? order : null
			  )
			: null;
	console.log("booooooooooked", isBooked);
	const displayLoginPanel = useSelector(
		(state) => state.styles.login.displayLoginPanel
	);
	const displaySignupPanel = useSelector(
		(state) => state.styles.signup.displaySignupPanel
	);
	const displayLogedInUserPanel = useSelector(
		(state) => state.styles.userPanel.display
	);
	const notify = () => {
		toast.success(<CustomNotification />, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 3000,
		});
	};
	let isToService = product.bookingType === "service" ? true : false;
	const otherImages = [product.thumbnail, ...images];
	let isDisabled = disable(
		isAuth,
		availableDates,
		product.quantity,
		product.name,
		isToService
	);

	return (
		<div
			className={`${
				displayLoginPanel || displaySignupPanel || displayLogedInUserPanel
					? "displayLoginPanel"
					: ""
			}`}>
			<Layout>
				<div className="container-fluid">
					<div className="row  container">
						<div className="col-8 my-2  d-flex flex-column">
							<img
								src={selectedImage ? selectedImage : product.thumbnail}
								alt={product.name}
								className="w-75 py-2 "
							/>
							{otherImages ? (
								<div className="d-flex flex-row">
									{otherImages.map((image) => (
										<img
											role="button"
											src={image}
											onClick={() => setSelectedImage(image)}
											alt={product.name}
											className="col-3 me-1 h-auto"
										/>
									))}
								</div>
							) : null}
						</div>

						<div className="col-4">
							<div className=" py-3 my-2 px-3">
								<p className="font-weight-bold display-4">{product.name}</p>
								<h5 className="text-muted font-weight-bold text-start">
									{product.price} rwf
								</h5>
								<p>
									{pathname.includes("/Clothing")
										? product.category
										: product.type}
								</p>
								<p>{product.madeBy ? product.madeBy : null}</p>
								<p className="font-weight-bold">Description</p>
								<p>{product.description}</p>
								{product.mapslink ? (
									<a
										href={product.mapslink}
										target="_blank"
										rel="noreferrer"
										className="ms-0 mb-3 mt-3  btn btn-primary">
										View on maps
									</a>
								) : null}

								<div className="row justify-content-between">
									<button
										disabled={false}
										className="button-sale col-6 "
										data-bs-toggle="modal"
										data-bs-target="#exampleModal">
										Get Item
									</button>
								</div>

								{isBooked && isBooked.length !== 0 ? (
									<p className="py-2">
										Item last ordered
										<ReactTimeAgo
											date={isBooked[isBooked.length - 1].createdAt}
											className="px-2"
										/>
									</p>
								) : null}
								{isDisabled ? isDisabled.message : null}
							</div>
						</div>
					</div>
				</div>
			</Layout>
			<BuyItemModal />
		</div>
	);
}

export default ItemPage;
