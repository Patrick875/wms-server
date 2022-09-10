const { paymentActionTypes } = require("./../constants/paymentActionTypes");
const initialState = { success: false };

export const paymentsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case paymentActionTypes.PAYMENT_COMPLETED:
			return { ...state, success: payload };
		default:
			return { ...state };
	}
};
