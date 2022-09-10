import { combineReducers } from "redux";
import { authActionTypes } from "../constants/authActionTypes";
import { userActionTypes } from "../constants/userActionTypes";

export const authReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case authActionTypes.LOGIN || authActionTypes.SIGN_UP:
			return { ...state, isAuth: payload.isAuth, user: payload.user };
		case authActionTypes.SIGN_UP:
			return { ...state, isAuth: payload.isAuth, user: payload.user };
		case userActionTypes.UPDATE_USER:
			console.log("UPDATING USER", payload);
			return { ...state, user: payload };
		case authActionTypes.LOGOUT:
			console.log("I AM TRYING");
			return { ...state, isAuth: false, user: null };
		default:
			return { ...state };
	}
};

export default authReducer;
