import { adminActionTypes } from "../constants/adminActionTypes";

const initialState = {};

export const getAllOrdersReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case adminActionTypes:
			return {
				...state,
				payload,
			};
		default:
			return { ...state };
	}
};
