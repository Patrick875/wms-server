import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Orders from "../Pages/Admin/Orders";

const OrdersPrintButton = () => {
	const componentRef = useRef();

	return (
		<div>
			<ReactToPrint
				trigger={() => <button>Print</button>}
				content={() => componentRef.current}
			/>
			<Orders ref={componentRef} />
		</div>
	);
};
export default OrdersPrintButton;
