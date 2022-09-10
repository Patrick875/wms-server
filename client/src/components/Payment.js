//jshint esversion:9
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { myDreamWeddingApi } from "../API/Api";
import { addpayment } from "../redux/actions/paymentActions";

export default function Payment(props) {
	const product = props.product;
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const makePayment = async (token) => {
		const body = { token, product };
		const response = await myDreamWeddingApi.post("/payments", body);
		if (response.status === 200) {
			dispatch(addpayment(true));
			window.location.reload(false);
			toast.success("Order placed check your email");
		} else {
			toast.error("payment failed");
		}
	};
	return (
		<StripeCheckout
			stripeKey={
				"pk_test_51Kbo4vJdw4sFRmjhGK4XTaQXyPcu7mv4b2sOv6U9wds0kArUZA2vC3dxskam420OGSKDOIm91SdkBWzfUz6P0lTr0084uYmKo7"
			}
			ComponentClass="div"
			token={makePayment}
			amount={props.disablePayment ? null : product.price * 100}
			currency="RWF"
			image={product.thumbnail}
			panelLabel="Pay with card"
			name={product.name}
			email={user.email}
			billingAddress={false}
			shippingAddress={false}>
			{props.children}
		</StripeCheckout>
	);
}
