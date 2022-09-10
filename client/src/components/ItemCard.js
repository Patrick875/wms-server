//jshint esversion:9
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteProductModal from "../Pages/Admin/DeleteProductModal";
import EditProductModal from "../Pages/Admin/EditProductModal";

function ItemCard({ product, categories, subcategories }) {
	let { thumbnail, name, price, type, hidden } = product;
	const isBooked = false;
	let { url } = useRouteMatch();
	return product ? (
		<div>
			<div className="bg-light  shadow-lg rounded">
				<div className="card-body ">
					<p className="card-title text-dark font-weight-bolder">{name}</p>
					<p className="card-subtitle mb-2 text-muted font-weight-normal">
						{type}
					</p>

					<img alt="" src={thumbnail} className="card-image w-100 " />

					<div className="card-title my-2 text-dark fw-bold ">{price} Rwf</div>
					<div className="py-2 row mx-1">
						{url.includes("admin") ? null : (
							<Link
								className={`card-link btn ${
									!isBooked ? "btn-outline-danger" : "btn-danger"
								} btn-sm nav-item font-weight-bold`}
								to={`${url}/${price}`}>
								{!isBooked ? "Book" : "Ordered"}
							</Link>
						)}
						{url.includes("admin") ? (
							<div className="d-flex flex-row justify-content-between">
								<Link
									className="card-link mx-0 text-dark btn btn-outline-primary col justify-content-center btn-sm d-flex flex-row align-content-center"
									data-bs-toggle="modal"
									data-bs-target={`#staticBackdropEdit${product._id}`}
									to="#">
									<i className="ri-pencil-line"></i>
								</Link>
								<Link
									className="card-link btn  mx-1 btn-outline-dark col justify-content-center btn-sm d-flex flex-row align-content-center"
									to="#">
									{hidden ? (
										<i className="ri-eye-line "></i>
									) : (
										<i className="ri-eye-off-line"></i>
									)}
								</Link>

								<Link
									className="card-link mx-0 d-flex flex-row align-content-center btn btn-outline-danger col justify-content-center btn-sm"
									to="#"
									data-bs-toggle="modal"
									data-bs-target={`#staticBackdrop${product._id}`}>
									<i className="ri-delete-bin-line  "></i>
								</Link>
							</div>
						) : null}
					</div>
				</div>
			</div>
			<DeleteProductModal product={product} />
			<EditProductModal
				product={product}
				categories={categories}
				subcategories={subcategories}
			/>
		</div>
	) : null;
}

export default ItemCard;
