import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { filter, sort } from "../redux/constants/sortFilterSearch";

function Clothing() {
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
	const items = useSelector((state) => {
		return state.allProducts.products;
	});
	let clothingItems = items.filter((item) => {
		if (item.category) {
			return item.category.includes("clothing") ? item : null;
		}
		return null;
	});
	console.log("CLOTHING SORTING", sortCriteria);
	clothingItems = sort(clothingItems, sortCriteria.criteria);
	const displayLoginPanel = useSelector(
		(state) => state.styles.login.displayLoginPanel
	);
	const displaySignupPanel = useSelector(
		(state) => state.styles.signup.displaySignupPanel
	);
	const displayLogedInUserPanel = useSelector(
		(state) => state.styles.userPanel.display
	);
	const size = {
		name: "Size",
		options: ["XL", "L", "M", "SM"],
	};
	const type = {
		name: "Type",
		options: ["Costumes", "Dresses", "Shoes", "Traditional"],
	};
	const options = [size, type];
	const filterActions = ["price(low-high)", "price(high-low)"];
	clothingItems = sort(clothingItems, sortCriteria.criteria);
	clothingItems = filter(clothingItems, "subcategory", filterDetails.criteria);

	return (
		<div
			className={`${
				displayLoginPanel || displaySignupPanel || displayLogedInUserPanel
					? "displayLoginPanel"
					: ""
			}`}>
			<Layout>
				<div className="clothing container">
					<Menu
						items={clothingItems}
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

export default Clothing;
