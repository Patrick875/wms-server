import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Switch } from "react-router-dom";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import ItemPage from "./ItemPage";
import { filter, sort } from "../redux/constants/sortFilterSearch";

function Hospitality() {
	const [filterDetails, setFilterDetails] = useState({});
	const [sortCriteria, setSortCriteria] = useState({});
	const getFilter = (detail) => {
		setFilterDetails({
			criteria: detail,
		});
	};
	const getSort = (criteria) => {
		setSortCriteria({ criteria });
	};
	const { path } = useRouteMatch();
	console.log(path);
	let hospitality = useSelector((state) =>
		state.allProducts.products.filter(
			(product) => product.category === "hospitality"
		)
	);

	const displayLoginPanel = useSelector(
		(state) => state.styles.login.displayLoginPanel
	);
	const displaySignupPanel = useSelector(
		(state) => state.styles.signup.displaySignupPanel
	);
	const displayLogedInUserPanel = useSelector(
		(state) => state.styles.userPanel.display
	);
	const type = {
		name: "Type",
		options: [
			"cakes",
			"catering",
			"location",
			"decoration",
			"flowers",
			"transport",
		],
	};

	const options = [type];
	const filterActions = ["price(low-high)", "price(high-low)"];
	hospitality = sort(hospitality, sortCriteria.criteria);
	hospitality = filter(hospitality, "subcategory", filterDetails.criteria);
	return (
		<div
			className={`${
				displayLoginPanel || displaySignupPanel || displayLogedInUserPanel
					? "displayLoginPanel"
					: ""
			}`}>
			<Layout>
				<div className="container">
					<Menu
						items={hospitality}
						filterOptions={options}
						filterActions={filterActions}
						getFilter={getFilter}
						getSort={getSort}
					/>
				</div>
			</Layout>
		</div>
	);
}

export default Hospitality;
