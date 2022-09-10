//jshint esversion:9
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import { approveOrder } from "../../redux/actions/adminActions";
import OrderTableHeader from "./OrderTableHeader";
import Pagination from "./Pagination";

const OrderTableItem = ({ order, number, hideActions }) => {
	const dispatch = useDispatch();
	const handleApproveOrder = () => {
		order.activated = true;
		dispatch(approveOrder(order._id, order));
		toast.success("order updated");
		//window.location.reload(false);
	};
	return (
		<div className="row ">
			<div className="list-group-item col-1 form-check">
				<p>{number}</p>
			</div>
			<div className="list-group-item list-group-item col-3">
				<p>{order.user_email}</p>
			</div>
			<Link to="#" className="list-group-item list-group-item-action col ">
				{order.product.price} (rfw)
			</Link>
			<Link to="#" className="list-group-item list-group-item-action col ">
				{order.product.quantity}
			</Link>
			<Link to="#" className="list-group-item list-group-item-action col ">
				{order.product.price * order.product.quantity} rfw
			</Link>
			<Link to="#" className="list-group-item list-group-item-action col ">
				{order.activated ? "activated" : "pending"}
			</Link>
			<Link to="#" className="list-group-item list-group-item-action col ">
				{order.createdAt}
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col "
				style={{ display: `${hideActions ? "none" : "visible"}` }}>
				{order ? (
					<div className="dropdown ">
						<Link
							className="btn  btn-sm btn-danger dropdown-toggle "
							to="#"
							role="button"
							id="dropdownMenuLink"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<i className="ri-creative-commons-nd-line" />
						</Link>

						<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<li>
								<Link
									className="dropdown-item"
									to="#"
									onClick={() => handleApproveOrder()}>
									Approve
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" to="#">
									Cancel
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

const Orders = (props) => {
	const orders = useSelector((state) => state.orders.orders);
	const tableOrders = orders.map((order) => {
		order.createdAt = new Date(order.createdAt).toLocaleString();
		return order;
	});
	//setting up filtering basing on months
	const monthsInOrders = tableOrders.map(
		(order) =>
			order.createdAt.split("/")[0] +
			"/" +
			order.createdAt.split("/")[2].split(",")[0]
	);
	const availableMonths = [...new Set(monthsInOrders)];
	const [month, setMonth] = useState("All");
	const ordersFromMonth =
		month === "All"
			? tableOrders
			: tableOrders.filter((order) =>
					order.createdAt.split("/")[0] +
						"/" +
						order.createdAt.split("/")[2].split(",")[0] ===
					month
						? order
						: null
			  );
	//setting orders pages
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(7);
	const indexOfLastPage = currentPage * postsPerPage;
	const indexOfFirstPage = indexOfLastPage - postsPerPage;
	const currentPageOrders = ordersFromMonth.slice(
		indexOfFirstPage,
		indexOfLastPage
	);
	//change pages
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	//setting up react-csv info to make a csv file
	const headers = [
		{ label: "User email", key: "user_email" },
		{ label: "Price/unit", key: "product.price" },
		{ label: "Quantity", key: "product.quantity" },
		{ label: "Total", key: "total" },
		{ label: "Status", key: "status" },
		{ label: "Date", key: "createdAt" },
	];
	const reportOrders = ordersFromMonth.map((order) => {
		order.total = order.product.price * order.product.quantity;
		order.status = order.activated ? "Activated" : "Pending";
		return order;
	});
	const csvReport = {
		data: reportOrders,
		headers,
	};
	const filename = month === "All" ? "All orders.csv" : `Orders from ${month}`;
	csvReport.filename = filename;
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="my-0 shadow-lg col d-flex flex-row justify-content-between">
					<CSVLink {...csvReport} className="btn btn-sm btn-primary col-3">
						{month === "All"
							? "Download all orders"
							: `Download orders from ${month}`}
					</CSVLink>
					<div className="col-4 row align-content-center">
						<div className="form-control d-flex flex-row py-0">
							<label className="col">Filter by month</label>
							<select
								className="form-select form-select-sm col"
								aria-label="Default select example"
								defaultValue={"All"}
								onChange={(e) => {
									setMonth(e.target.value);
								}}>
								<option>All</option>
								{availableMonths.map((month) => (
									<option key={month}>{month}</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</nav>
			<div className="card ">
				<OrderTableHeader hideActions={props.hideActions} />
				{orders && !("error" in orders)
					? currentPageOrders.map((order, index) => (
							<OrderTableItem
								order={order}
								number={orders.indexOf(order) + 1}
								key={order._id}
							/>
					  ))
					: null}
				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={orders.length}
					paginate={paginate}
				/>
			</div>
		</div>
	);
};

export default Orders;
