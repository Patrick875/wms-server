//jshint esversion:9
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useRouteMatch, useLocation } from "react-router-dom";
import { displayLoginPanel } from "../redux/actions/styesActions";
import AuthComponent from "./Auth/AuthComponent";
import UserHeaderAvatar from "./user/userHeaderAvatar";
import UserPanel from "./user/UserPanel";

function HeaderMenu({ pages, click }) {
	const isAuth = useSelector((state) => state.auth.isAuth);
	const role = useSelector((state) =>
		state.auth.user ? state.auth.user.role : null
	);
	const displayLoginPanel = useSelector(
		(state) => state.styles.login.displayLoginPanel
	);
	const displaySignupPanel = useSelector(
		(state) => state.styles.signup.displaySignupPanel
	);
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					WMS
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse text-center"
					id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{pages.map((el) => (
							<MenuItem item={el} key={el} />
						))}
					</ul>
					{isAuth ? (
						<div className=" d-flex flex-col align-content-center ">
							<UserHeaderAvatar />
							{role && role === "admin" ? (
								<Link
									className=" font-weight-bold  px-2 py-1 d-flex flex-row justify-content-start col"
									to="/admin">
									View admin panel
								</Link>
							) : null}
						</div>
					) : (
						<button
							style={{
								backgroundColor: "rgb(234, 137, 77)",
								visibility: `${
									displayLoginPanel || displaySignupPanel ? "hidden" : "visible"
								}`,
							}}
							className={` btn font-weight-bold  px-2 py-1 mx-4 text-white login-btn col-2`}
							onClick={click}
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent">
							Get Started
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}

function MenuItem({ item }) {
	const { path, url } = useRouteMatch();
	const { pathname } = useLocation();
	let page = item === "Home" ? "" : pathname.replace(url, `/${item}`);

	return (
		<li className="nav-item">
			<NavLink
				className="nav-link"
				to={page}
				activeClassName="active"
				exact={true}>
				{`${item}`}
			</NavLink>
		</li>
	);
}

//collapse button for navbar

function CollapseButton() {
	return (
		<button
			className="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>
	);
}
//top-header

function TopHeader() {
	return (
		<Link className="navbar-brand" to="#">
			WMS
		</Link>
	);
}
//header menu

//carousel

function Header() {
	let isAuth = useSelector((state) => state.auth.isAuth);
	let display = useSelector((state) => state.styles.login.displayLoginPanel);
	const pages = [
		"Home",
		"hospitality",
		"clothing",
		"makeup",
		"bridesGroomsmaids",
		"sound",
		"camerawork",
	];
	const dispatch = useDispatch();
	const handleLoginButtonClick = () => {
		return function () {
			dispatch(displayLoginPanel(!display));
			// dispatch(displaySignupPanel(display));
		};
	};
	// home-events--clothing--hospitality--transport--makeup&haircuts--
	return (
		<div className="Navbar d-flex flex-column">
			<HeaderMenu pages={pages} click={handleLoginButtonClick()} />
			<div className="d-flex flex-row justify-content-end">
				{isAuth ? <UserPanel /> : <AuthComponent />}
			</div>
		</div>
	);
}

export default Header;
