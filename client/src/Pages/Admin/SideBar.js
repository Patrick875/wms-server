import React from "react";
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { displayAdminMenuItem } from "../../redux/actions/styesActions";
import { Link, useRouteMatch } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { logout } from "./../../redux/actions/authActions";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
function SideBar() {
	const { pathname } = useLocation();

	const { url } = useRouteMatch();
	const { names, profileImage } = useSelector((state) => state.auth.user);
	const categories = [
		"hospitality",
		"clothing",
		"makeup",
		"bridesGroomsmaids",
		"sound",
		"camerawork",
	];
	let dispatch = useDispatch();
	const history = useHistory();
	const handleLogout = () => {
		dispatch(logout());
		history.push("/");
	};
	const handleOnClick = (text) => {
		return function () {
			dispatch(displayAdminMenuItem(text));
		};
	};
	return (
		<div className="col">
			<ProSidebar style={{ position: "fixed" }}>
				<SidebarHeader>
					<div className="d-flex flex-row m-2">
						{profileImage && profileImage.length !== 0 ? (
							<div className="avatar-holder-header mx-0 col-3">
								<img src={profileImage[0]} alt="admin" />
							</div>
						) : null}

						<div>
							<p>{names}</p>
							<p>WMS Admin</p>
						</div>
					</div>
					<div className="text-center my-2">
						<Link to={`${url}/profile`} className="nav-link text-white">
							Edit profile
						</Link>
						<Link to="/" className="nav-link text-white">
							View website
						</Link>
					</div>
				</SidebarHeader>
				<SidebarContent>
					<Menu iconShape="square">
						<MenuItem
							title=""
							onClick={handleOnClick("")}
							icon={<i className="ri-dashboard-fill" />}>
							Dashboard
							<Link to={`${url}`} />
						</MenuItem>

						<SubMenu
							title="Products"
							icon={<i className="ri-shopping-basket-line" />}>
							<MenuItem onClick={handleOnClick("Add product")}>
								<p>Add product</p>
								<Link to={`${url}/addProduct`} />
							</MenuItem>
							<MenuItem onClick={handleOnClick("All products")}>
								<Link to={`${url}/allProducts`} />
								<p>All Products</p>
							</MenuItem>
							{categories.map((category) => {
								return (
									<MenuItem
										key={category}
										title={category}
										onClick={handleOnClick({ category })}>
										<p className="text-capitalize">{category}</p>
										<Link to={`${url}/${category}`} />
									</MenuItem>
								);
							})}
						</SubMenu>
						<MenuItem
							title="Orders"
							onClick={handleOnClick("Orders")}
							icon={<i className="ri-shopping-cart-line" />}>
							Orders
							<Link to={`${url}/orders`} />
						</MenuItem>
						<MenuItem
							title="Revenue"
							onClick={handleOnClick("Revenue")}
							icon={<i className="ri-hand-coin-line" />}>
							Revenue
							<Link to={`${url}/revenue`} />
						</MenuItem>
					</Menu>
				</SidebarContent>
				<SidebarFooter>
					<div className="ms-0 py-2 w-100 d-flex flex-row align-items-center justify-content-center">
						<Link
							onClick={() => handleLogout()}
							className="nav-link text-white ms-0 d-flex flex-row align-items-center justify-content-center ">
							<i className="ri-logout-circle-r-line px-2 " />
							Logout
						</Link>
					</div>
				</SidebarFooter>
			</ProSidebar>
		</div>
	);
}

export default SideBar;
