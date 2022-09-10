import React from "react";
import AdminTopNav from "./AdminTopNav";
import { Link } from "react-router-dom";
import ProductsTableHeader from "./ProductsTableHeader";

const ProductsTableItems = function () {
	return (
		<Link
			to="#"
			className="list-group-item list-group-item-action row"
			aria-current="true">
			<div className="d-flex w-100 justify-content-between">
				<h5 className="mb-1">List group item heading</h5>
				<small>3 days ago</small>
			</div>
			<p className="mb-1">Some placeholder content in a paragraph.</p>
			<small>And some small print.</small>
		</Link>
	);
};
const ProductsTableItem = function (props) {
	// const { name, price, img, status } = item ? item : null;

	return (
		<div className="row ">
			<div className="list-group-item col-1 form-check">
				<input className="form-check-input mx-1" type="checkbox" />
			</div>
			<div className="list-group-item list-group-item col-5">
				{props.item ? (
					<div className="row">
						<div className="col-2">
							<img src="/man.jpg" alt="product" style={{ maxHeight: "3em" }} />
						</div>
						<p className="col">{props.item.name}</p>
					</div>
				) : (
					<p className="fw-bold">Name</p>
				)}
			</div>
			<Link
				to="#"
				className={`list-group-item list-group-item-action col ${
					!props.item ? "fw-bold" : null
				}`}>
				{props.item ? props.item.price : "Price (rfw)"}
			</Link>
			<Link
				to="#"
				className={`list-group-item list-group-item-action col ${
					!props.item ? "fw-bold" : null
				}`}>
				{props.item ? props.item.status : "Status"}
			</Link>
			<Link
				to="#"
				className={`list-group-item list-group-item-action col ${
					!props.item ? "fw-bold" : null
				}`}>
				{props.item ? (
					<div className="dropdown ">
						<Link
							className="btn  btn-sm btn-danger dropdown-toggle "
							href="#"
							role="button"
							id="dropdownMenuLink"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<i className="ri-creative-commons-nd-line" />
						</Link>

						<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<li>
								<Link className="dropdown-item" href="#">
									view
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Edit
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" href="#">
									Delete
								</Link>
							</li>
						</ul>
					</div>
				) : (
					"Actions"
				)}
			</Link>
		</div>
	);
};
const ProductsTable = function () {
	const item = { name: "car", price: 2340000, status: "active" };
	const header = ["select", "Name", "Price (rwf)", "Status", "Action"];
	return (
		<div className="list-group">
			<ProductsTableHeader header={header} />
			<ProductsTableItem item={item} />
			<ProductsTableItem item={item} />
		</div>
	);
};
function ProductList({ categories, subcategories }) {
	return (
		<div className="card ">
			<ProductsTable />
		</div>
	);
}

export default ProductList;
