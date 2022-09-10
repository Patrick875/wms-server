import { Link } from "react-router-dom";

const ProductsTableHeader = () => {
	return (
		<div className="row list-group-flush ">
			<div className="list-group-item col-1 form-check">
				<input className="form-check-input mx-1" type="checkbox" />
			</div>
			<div className="list-group-item list-group-item col-5">
				<div className="row">
					<p className="col fw-bold">Name</p>
				</div>
			</div>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold ">
				Price (rfw)
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold">
				Status
			</Link>
			<Link
				to="#"
				className="list-group-item list-group-item-action col fw-bold">
				Actions
			</Link>
		</div>
	);
};
export default ProductsTableHeader;
