import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { filter, sort } from "../redux/constants/sortFilterSearch";

function Makeup() {
	const displayLoginPanel = useSelector(
		(state) => state.styles.login.displayLoginPanel
	);
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
	const displaySignupPanel = useSelector(
		(state) => state.styles.signup.displaySignupPanel
	);
	const displayLogedInUserPanel = useSelector(
		(state) => state.styles.userPanel.display
	);
	const type = {
		name: "Type",
		options: ["makeup", "hairstyle", "haircut"],
	};

	const options = [type];
	const filterActions = ["price(low-high)", "price(high-low)"];
	const items = useSelector((state) => {
		return state.allProducts.products;
	});
	let makeup = items.filter((item) => {
		if (item.category) {
			return item.category.includes("makeup") ? item : null;
		}
		return null;
	});
	makeup = filter(makeup, "subcategory", filterDetails.criteria);
	makeup = sort(makeup, sortCriteria.criteria);

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
						items={makeup}
						filterOptions={options}
						filterActions={filterActions}
					/>
				</div>
			</Layout>
		</div>
	);
}

export default Makeup;
