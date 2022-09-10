import { paymentActionTypes } from "../constants/paymentActionTypes";

export const addpayment = (payload) => {
	return {
		type: paymentActionTypes.PAYMENT_COMPLETED,
		payload: {
			success: payload,
		},
	};
};
