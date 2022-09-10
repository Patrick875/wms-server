import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link, useRouteMatch } from "react-router-dom";
import { setSelectedProduct } from "../redux/actions/productActions";
import { sortOptions } from "../redux/constants/sortFilterSearch";
import ItemCard from "./ItemCard";

function CheckBox({ text, idHolder }) {
	return (
		<div>
			<input
				className="form-check-input"
				type="checkbox"
				value=""
				id={`flexCheckIndeterminate${idHolder}`}
			/>
			<label className="form-check-label" for="flexCheckIndeterminate">
				{text}
			</label>
		</div>
	);
}
function Options({ options, filterNumber }) {
	return (
		<div className="collapse py-0 my-0" id={`collapseExample${filterNumber}`}>
			<div className="card card-body">
				<div className="form-check">
					{options.map((el, i) => (
						<CheckBox text={el} key={el} idHolder={i} />
					))}
				</div>
			</div>
		</div>
	);
}
function FilterCriterion({ criterion, filterNumber }) {
	const [toggleIcon, settoggleIcon] = useState(true);
	console.log(filterNumber);
	return (
		<p>
			<div
				className="btn w-100 text-start d-flex justify-content-between"
				onClick={() => settoggleIcon(!toggleIcon)}
				type="button"
				data-bs-toggle="collapse"
				data-bs-target={`#collapseExample${filterNumber}`}
				aria-expanded="false"
				aria-controls={`#collapseExample${filterNumber}`}>
				{criterion}
				<i
					className={`ri-${
						toggleIcon ? "add" : "subtract"
					}-line  expand-btn`}></i>
			</div>
		</p>
	);
}
function FilterOption({ criterion, options, filterNumber }) {
	return (
		<div>
			<FilterCriterion criterion={criterion} filterNumber={filterNumber} />
			<Options options={options} filterNumber={filterNumber} />
		</div>
	);
}
function FilterDropdownItem({ action }) {
	return (
		<li>
			<Link className="dropdown-item" to="#">
				{action}
			</Link>
		</li>
	);
}
function FilterDropDownList({ filterActions }) {
	return (
		<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
			{filterActions.map((el) => (
				<FilterDropdownItem action={el} key={el} />
			))}
		</ul>
	);
}
function Menu({ items, filterOptions, filterActions, getSort, getFilter }) {
	const subcategories = useSelector(
		(state) => state.allProducts.constants.subcategories
	);
	const categories = [
		"hospitality",
		"clothing",
		"makeup",
		"bridesGroomsmaids",
		"sound",
		"camerawork",
	];
	const dispatch = useDispatch();
	const handleClick = (item) => {
		console.log("I JUST GOT CLICKED");
		dispatch(setSelectedProduct(item));
	};
	const [filter, setFilter] = useState();
	console.log("setFilter", filter);

	let { url, path } = useRouteMatch();
	console.log(path, path);
	const category = url.replace("/", "");
	console.log(category);
	return (
		<div className="Menu my-5">
			<h2 className="text-center">{url.replace("/", "")}</h2>
			<div className="row">
				<div className="col  border-3 border-info   px-0">
					<div className="w-100 d-flex justify-content-between shadow">
						<p className="ps-3">{items.length} results </p>
						<p className="pe-4">
							<div className="form row">
								<div className="col ">
									<label>Filter</label>
									<select
										className="form-select "
										aria-label="Default select example"
										onChange={(e) => {
											getFilter(e.target.value);
										}}>
										<option selected>All</option>
										{subcategories && subcategories.length !== 0
											? subcategories[category].map((subcategory) => (
													<option value={subcategory}>{subcategory}</option>
											  ))
											: null}
									</select>
								</div>

								<div className="col mx-4 ">
									<label>sort</label>
									<select
										className="form-select dropdown "
										aria-label="Default select example"
										onChange={(e) => {
											getSort(e.target.value);
										}}>
										<option selected className="dropdown-item">
											All
										</option>
										{sortOptions.map((option) => (
											<option value={option}>{option}</option>
										))}
									</select>
								</div>
							</div>
						</p>
					</div>
					<div className="cards row m-2">
						{items && items.length !== 0 ? (
							items.map((item, index) => (
								<NavLink
									to={`${url}/${item.price}`}
									className={`col-3 nav-link`}
									onClick={() => handleClick(item)}>
									<ItemCard
										product={item}
										categories={categories}
										subcategories={subcategories}
										key={index}
									/>
								</NavLink>
							))
						) : (
							<div>No items available</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Menu;

// <select className="form-select" aria-label="Default select example">
// 	<option selected>---</option>
// 	{subcategories && subcategories.length !== 0
// 		? subcategories[category].map((subcategory) => (
// 				<option value={subcategory}>{subcategory}</option>
// 		  ))
// 		: null}
// </select>;
