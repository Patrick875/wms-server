import { DateObject } from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateProduct } from "../../redux/actions/productActions";

export default function EditProductConfirmationModal({
	productData,
	product,
	timeAvailable,
}) {
	const format = "DD/MM/YY/HH:mm";
	const dispatch = useDispatch();
	let endpoint = productData.subcategory;
	if (productData.category === "camerawork") {
		endpoint = "photoandvideo";
	}
	const handleUpdateProduct = () => {
		// productData.timeAvailable = timeAvailable.map((date) =>
		// 	new DateObject(date).format(format)
		// // );
		console.log("WE ARE UPDATING", productData);
		// console.log(product);

		productData = { ...product, ...productData };
		console.log("product data", productData);
		console.log("UPDATING TO", endpoint);
		dispatch(updateProduct(productData._id, productData, endpoint));
	};
	return (
		<div
			className="modal fade"
			id={`confirmProductUpdate${product._id}`}
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="staticBackdropLabel"
			aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">
							Confirm {productData.name} update
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<p>This action will update {productData.name} in the database.</p>
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
							onClick={() => handleUpdateProduct()}>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
