import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import { sort, filter } from "../redux/constants/sortFilterSearch";

function PhotoAndVideo() {
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
	let photoAndVideo = items.filter((item) => {
		if (item.category) {
			return item.category.includes("camerawork") ? item : null;
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
	const Type = {
		name: "Type",
		options: ["Photography", "Videography", "Both"],
	};
	const filterActions = ["price(low-high)", "price(high-low)"];
	const options = [Type];
	photoAndVideo = sort(photoAndVideo, sortCriteria.criteria);
	photoAndVideo = filter(photoAndVideo, "subcategory", filterDetails.criteria);

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
						items={photoAndVideo}
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

export default PhotoAndVideo;
