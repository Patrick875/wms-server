//jshint esversion:9
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
import {
	displayLogedInUserPanel,
	displayUserMenuItem,
} from "../../redux/actions/styesActions";
import { updateUser } from "../../redux/actions/authActions";
import Avatar from "./Avatar";
import LogeInMenuLayout from "./LogeInMenuLayout";

const UserListItem = function ({ icon, text }) {
	let dispatch = useDispatch();
	const handleClick = () => {
		dispatch(displayUserMenuItem(text));
	};
	const handleLogout = () => {
		dispatch(displayLogedInUserPanel(false));
		dispatch(logout());
	};
	return (
		<Link
			to="#"
			onClick={() => (text === "Logout" ? handleLogout() : handleClick())}
			className="list-group-item list-group-item-action d-flex flex-row align-items-center">
			<i className={`${icon} ri-lg px-2`}></i>
			{text}
		</Link>
	);
};

const UserMenu = function () {
	const userMenuOptions = {
		text: ["Orders", "Profile and settings", "Logout"],
		icons: ["ri-booklet-line", "ri-computer-line", "ri-logout-circle-r-line"],
	};
	return (
		<div className="list-group ">
			{userMenuOptions.text.map((option, index) => (
				<UserListItem
					text={option}
					icon={userMenuOptions.icons[index]}
					key={index}
				/>
			))}
		</div>
	);
};

const TabHead = ({ tab, number }) => {
	let dispatch = useDispatch();
	const handleReturn = () => {
		dispatch(displayUserMenuItem(""));
	};
	return (
		<div className="row">
			<i
				className="ri-arrow-left-s-line ri-xl"
				role="button"
				onClick={() => handleReturn()}></i>
			<h3 className="my-2 text-center">{tab}</h3>
			{number ? <p className="text-muted">{number}</p> : null}
		</div>
	);
};
const UserOrders = function () {
	const orders = useSelector((state) => state.orders.orders);
	console.log("USER PANEL ORDERS", orders);
	return (
		<div>
			<TabHead tab="Orders" />
			<p className="fw-bold">Orders</p>
			<p className="">Activated orders</p>
			{orders
				.filter((order) => order.activated)
				.map((order) => {
					const product = order.product;
					return (
						<div className="card">
							<div className="card-body d-flex flex-row justify-content-between">
								<p>{product.name}</p>
								<p> {product.price} frw</p>
							</div>
						</div>
					);
				})}

			<p className="">Pending orders</p>
			{orders
				.filter((order) => !order.activated)
				.map((order) => {
					const product = order.product;
					return (
						<div className="card">
							<div className="card-body d-flex flex-row justify-content-between">
								<p>{product.name}</p>
								<p> {product.price} frw</p>
							</div>
						</div>
					);
				})}
		</div>
	);
};

const UserPanelHome = function () {
	return (
		<React.Fragment>
			<UserMenu />
		</React.Fragment>
	);
};

//condition if city is not set disable district---to be implemented later

const ProfileAndSettings = function () {
	const [image, setImage] = useState([]);
	const onDropImage = useCallback((acceptedFiles, rejectedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				setImage((prev) => [...prev, reader.result]);
			};
			reader.readAsDataURL(file);
			console.log(file);
		});
	}, []);
	const { getInputProps: getProfileInputProps, getRootProps: getProfileProps } =
		useDropzone({
			onDrop: onDropImage,
			accept: "image/png,image/jpg,image/jpeg",
		});
	const dispatch = useDispatch();
	const cities = ["Kigali", "Southern", "Northern", "Western", "Eastern"];
	let { names, telephone, email, profileImage, location } = useSelector(
		(state) => state.auth.user
	);
	const userProfile =
		profileImage && profileImage.length !== 0 ? profileImage[0] : null;
	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
	} = useForm({
		defaultValues: {
			names: names,
			telephone: telephone,
			email: email,
			address: location.address,
			city: location.city,
		},
	});
	const currentValues = watch();
	const onSubmit = (data) => {
		const city = data.city;
		const address = data.address;
		data.city = undefined;
		data.address = undefined;
		data.location = { city, address };
		data.profileImage = image[0];
		console.log(data);
		dispatch(updateUser(data));
	};
	//tab head--->ProfileAvatars---->userData---->paymentMethod
	return (
		<div>
			<TabHead tab="Profile and settings" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<p className="h6">User Profile</p>
				<div className="my-4 ">
					<div className="d-flex flex-col mb-4">
						<div className="avatar-holder">
							<img src={userProfile} alt={`${names} profile`} />
						</div>
						<div className="mx-4 form-group " {...getProfileProps()}>
							<i className="ri-upload-cloud-2-line ri-3x rounded px-3 border border-dark" />
							<p className="fw-bold text-muted">Upload profile picture</p>
							<input
								className="form-control"
								type="file"
								id="formFile"
								style={{ visibility: "hidden", display: "none" }}
								{...getProfileInputProps()}
							/>
						</div>
					</div>
					{image.length > 0 ? (
						<div className="row">
							<div className="img-container col">
								<i
									className=" btn btn-sm btn-danger ri-delete-bin-5-line ri-1x overay-btn "
									onClick={() => setImage([])}
								/>

								<img
									src={image[0]}
									className="selected-image me-2 rounded "
									alt="profile"
								/>
							</div>
						</div>
					) : null}
				</div>

				<div className="user-data">
					<p className="fs-4">Contact</p>
					<div className="my-2">
						<label className="fs-5">Email </label>
						<input
							placeholder="price"
							className="form-control"
							id="exampleInputEmail"
							aria-describedby="emailHelp"
							{...register("email")}
						/>
					</div>
					<div className="my-2">
						<label className="fs-5">Phone</label>
						<input
							placeholder="price"
							className="form-control"
							id="exampleInputTelephone"
							aria-describedby="emailHelp"
							{...register("telephone")}
						/>
					</div>

					<p className="fs-4">Location</p>
					<div className="my-2">
						<label className="fs-5">Address</label>
						<input
							placeholder="address"
							className="form-control"
							id="exampleInputAdress"
							aria-describedby="emailHelp"
							{...register("address")}
						/>
					</div>
					<div className="my-2 mb-3">
						<label className="fs-5 "> City/Province</label>
						<select
							className="form-select"
							aria-label="Default select example"
							{...register("city")}>
							<option selected>{location.city ? location.city : "---"}</option>
							{cities.map((city) => (
								<option value={city}>
									{city === "Kigali" ? city : `${city} province`}
								</option>
							))}
						</select>
					</div>
					<div className="d-flex flex-row my-4 justify-content-between">
						<button
							type="button"
							data-bs-dismiss="modal"
							className="btn mx-3 fw-bold shadow"
							style={{ backgroundColor: "rgb(210,210,210)" }}>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-primary fw-bold shadow"
							onClick={() => handleSubmit(onSubmit)}>
							Save changes
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default function UserPanel() {
	let dispatch = useDispatch();

	let tab = useSelector((state) => state.styles.menuItem.tab);
	let MenuItemTab;
	switch (tab) {
		case "":
			MenuItemTab = UserPanelHome;
			break;
		case "Orders":
			MenuItemTab = UserOrders;
			break;

		case "Profile and settings":
			MenuItemTab = ProfileAndSettings;
			break;

		default:
			break;
	}

	return (
		<LogeInMenuLayout>
			<Avatar />
			<MenuItemTab />
		</LogeInMenuLayout>
	);
}
