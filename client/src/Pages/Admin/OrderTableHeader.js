import React from "react";
import { Link } from "react-router-dom";

function OrderTableHeader({ hideActions }) {
	return (
		<div className="row list-group-flush ">
			<Link className="list-group-item list-group-item col-1 fw-bold " to="#">
				ID
			</Link>
			<Link className="list-group-item list-group-item col-3  fw-bold" to="#">
				Email
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold ">
				Price/unit (rfw)
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold ">
				Quantity
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold ">
				Total(rfw)
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold">
				Status
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold">
				Date
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold"
				disabled={hideActions ? hideActions : false}>
				Actions
			</Link>
		</div>
	);
}

export default OrderTableHeader;
