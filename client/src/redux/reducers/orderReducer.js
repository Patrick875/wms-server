import { adminActionTypes } from "../constants/adminActionTypes";
import { orderActionTypes } from "../constants/orderTypes";

export const ordersReducer = (state = { orders: [] }, { type, payload }) => {
	switch (type) {
		case orderActionTypes.ORDER_PRODUCT:
			return { ...state, orders: [...orders, ...payload] };
		case orderActionTypes.GET_ORDERS:
			return { ...state, orders: payload };
		case adminActionTypes.APPROVE_ORDER:
			const orders = state.orders.filter((order) =>
				order._id === payload._id ? { ...order, payload } : order
			);
			return { ...state, orders };
		case orderActionTypes.GET_ALL_ORDERS:
			return { ...state, orders: payload };
		case orderActionTypes.CLEAR_ORDERS:
			return { ...payload };
		default:
			return { ...state };
	}
};
