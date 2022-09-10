import { toast } from "react-toastify";
import { myDreamWeddingApi } from "../../API/Api";
import { orderActionTypes } from "../constants/orderTypes";

export const orderProduct = (order, user) => {
	return async function (dispatch) {
		let res = await myDreamWeddingApi.post(`/orders`, order).catch((err) => {
			toast.error("order not placed");
			console.log(err);
		});

		if (res) {
			dispatch({
				type: orderActionTypes.ORDER_PRODUCT,
				payload: [res.data.data.newOrder],
			});
		} else {
			console.log("ACTION FAILED");
		}
	};
};
export const getUserOrders = (user) => {
	return async function (dispatch) {
		let res = await myDreamWeddingApi.get(`/orders/${user}`).catch((err) => {
			console.log(err.message);
		});
		console.log("USER ORDERS", res);
		dispatch({
			type: orderActionTypes.GET_ORDERS,
			payload: res.data.data.orders,
		});
	};
};
export const getAllOrders = () => {
	return async function (dispatch) {
		const res = await myDreamWeddingApi.get("/orders").catch((err) => {
			console.log(err.message);
			dispatch({
				type: orderActionTypes.GET_ALL_ORDERS,
				payload: {
					error: {
						name: err.name,
					},
				},
			});
		});
		console.log("ALL ORDERS", res);
		if (res.status === 200) {
			dispatch({
				type: orderActionTypes.GET_ALL_ORDERS,
				payload: res.data.data.orders,
			});
		}
	};
};
export const clearOrders = () => {
	return {
		type: orderActionTypes.CLEAR_ORDERS,
		payload: [],
	};
};
