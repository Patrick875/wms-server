import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { filter, sort } from "../redux/constants/sortFilterSearch";

function BridesmaidsAndGroomsmaids() {
	const displaySignupPanel = useSelector(
		(state) => state.styles.signup.displaySignupPanel
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
	const displayLoginPanel = useSelector(
		(state) => state.styles.login.displayLoginPanel
	);
	const displayLogedInUserPanel = useSelector(
		(state) => state.styles.userPanel.display
	);
	const gender = { name: "Gender", options: ["Bridesmaids", "Groomsmaids"] };
	const filterActions = ["price(low-high)", "price(high-low)"];
	const options = [gender];
	const items = useSelector((state) => {
		return state.allProducts.products;
	});
	let brides = items.filter((item) => {
		if (item.category) {
			return item.category.includes("bridesGroomsmaids") ? item : null;
		}
		return null;
	});
	brides = filter(brides, "subcategory", filterDetails.criteria);
	brides = sort(brides, sortCriteria.criteria);
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
						items={brides}
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

export default BridesmaidsAndGroomsmaids;
