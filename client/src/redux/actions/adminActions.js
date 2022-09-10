import { myDreamWeddingApi } from "../../API/Api";
import { adminActionTypes } from "../constants/adminActionTypes";

export const getAllOrders = () => {
	return async function (dispatch) {
		const data = await myDreamWeddingApi.get("/orders");
		dispatch({
			type: adminActionTypes.GET_ALL_ORDERS,
			payload: data.orders,
		});
	};
};
export const approveOrder = (id, order) => {
	console.log("order approve");
	return async function (dispatch) {
		const data = await myDreamWeddingApi.patch(`/orders/${id}`, order);
		dispatch({
			type: adminActionTypes.APPROVE_ORDER,
			payload: data.updatedOrder,
		});
	};
};
