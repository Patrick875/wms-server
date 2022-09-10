import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { filter, sort } from "../redux/constants/sortFilterSearch";

function Sound() {
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
	let sound = items.filter((item) => {
		if (item.category) {
			return item.category.includes("sound") ? item : null;
		}
		return null;
	});
	const displayLoginPanel = useSelector(
		(state) => state.styles.login.displayLoginPanel
	);
	const displaySignupPanel = useSelector(
		(state) => state.styles.signup.displaySignupPanel
	);
	const displayLogedInUserPanel = useSelector(
		(state) => state.styles.userPanel.display
	);
	const soundSystem = {
		name: "Sound-system",
		options: ["Full concert", "Meeting", "Small Meeting"],
	};
	const Entertainer = {
		name: "Entertainment",
		options: ["Band", "Singer", "Mc", "Itorero", "DJ"],
	};
	const filterActions = ["price(low-high)", "price(high-low)"];
	const options = [soundSystem, Entertainer];
	sound = sort(sound, sortCriteria);
	sound = filter(sound, "subcategory", filterDetails.criteria);

	return (
		<div
			className={`${
				displayLoginPanel || displaySignupPanel || displayLogedInUserPanel
					? "displayLoginPanel"
					: ""
			}`}>
			<Layout>
				<div className="sound container">
					<Menu
						items={sound}
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

export default Sound;
