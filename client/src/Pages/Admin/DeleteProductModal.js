import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/productActions";

export default function DeleteProductModal({ product }) {
	const dispatch = useDispatch();
	const { _id, category, subcategory } = product;
	const handleDeleteProduct = (product_id, category, subcategory) => {
		let endpoint = subcategory;
		if (category === "camerawork") {
			endpoint = "photoandvideo";
		}
		console.log(_id);
		dispatch(deleteProduct(product_id, endpoint));
		window.location.reload(false);
	};
	return (
		<div
			className="modal fade"
			id={`staticBackdrop${product._id}`}
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">
							Are you sure you want to delete {product.name} ?
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<p>
							This action will delete {product.name} from the database which
							will make it unavailable for your users and yourself. If you want
							to hide the product from your website visitors we recommend
							hidding it instead.
						</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal">
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-primary"
							data-bs-dismiss="modal"
							onClick={() => handleDeleteProduct(_id, category, subcategory)}>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
