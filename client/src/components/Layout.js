import React from "react";
import { useSelector } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import ItemPage from "../Pages/ItemPage";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
	const { path } = useRouteMatch();
	console.log("LAYOUT PATH", path);

	return (
		<div className="container-fluid px-0">
			<Header />
			<div className="min-vh-100">{props.children}</div>
			<Footer />
		</div>
	);
}

export default Layout;
