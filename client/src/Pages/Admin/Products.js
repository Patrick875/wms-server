import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import ItemCard from "../../components/ItemCard";
import { filter, sort } from "../../redux/constants/sortFilterSearch";
import AdminTopNav from "./AdminTopNav";
import Pagination from "./Pagination";
function Products({ products }) {
	const [searchDetails, setSearchDetails] = useState({});
	const [filterDetails, setFilterDetails] = useState({});
	const [sortCriteria, setSortCriteria] = useState({});
	const [searchProduct, setSearchProduct] = useState();
	let tab = useSelector((state) => state.styles.adminPanel.tab);
	const categories = useSelector(
		(state) => state.allProducts.constants.categories
	);
	const getSearch = (search, category) => {
		setSearchDetails({
			name: search,
			category: category,
		});
		console.log(search);
		console.log(category);
	};
	const getFilter = (detail) => {
		setFilterDetails({
			criteria: detail,
		});
	};
	const getSort = (criteria) => {
		setSortCriteria({ criteria });
	};
	const subcategories = useSelector(
		(state) => state.allProducts.constants.subcategories
	);
	products = searchDetails
		? searchDetails.name && searchDetails.name.length !== 0
			? searchDetails.category === "allProducts"
				? products.filter((product) =>
						product.name.toLowerCase().includes(searchDetails.name)
				  )
				: products.filter(
						(product) =>
							product.category === searchDetails.category &&
							product.name.toLowerCase().includes(searchDetails.name)
				  )
			: products
		: products;

	const foundProducts =
		products && products.length !== 0
			? products.filter((product) =>
					product.name === searchDetails.name ? product : null
			  )
			: null;

	products = filter(products, "subcategory", filterDetails.criteria);
	products = sort(products, sortCriteria.criteria);

	return (
		<div>
			<AdminTopNav
				getSearch={getSearch}
				getSort={getSort}
				getFilter={getFilter}
			/>
			<div className="card w-100">
				<div className="row">
					{products && products.length !== 0 ? (
						products.map((product) => {
							return (
								<div className="col-3">
									<ItemCard
										product={product}
										categories={categories}
										subcategories={subcategories}
									/>
								</div>
							);
						})
					) : (
						<div className="text-center my-2">
							No products for this category
						</div>
					)}
				</div>
			</div>
			<Pagination />
		</div>
	);
}

export default Products;
