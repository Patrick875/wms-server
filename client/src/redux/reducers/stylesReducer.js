import { combineReducers } from "redux";
import { styleActionTypes } from "../constants/styleActionTypes";
const loginOverlayReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case styleActionTypes.DISPLAY_LOGIN_PANEL:
			return { ...state, displayLoginPanel: payload };
		default:
			return { ...state, displayLoginPanel: false };
	}
};
const signupOverlayReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case styleActionTypes.DISPLAY_SIGNUP_PANEL:
			return { ...state, displaySignupPanel: payload };
		default:
			return { ...state, displaySignupPanel: false };
	}
};

const menuItemReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case styleActionTypes.DISPLAY_USERMENU_ITEM:
			return { ...state, tab: payload };
		default:
			return { ...state, tab: "" };
	}
};
const logedUserPanelReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case styleActionTypes.DISPLAY_LOGEDIN_USER_PANEL:
			return { ...state, display: payload };
		default:
			return state;
	}
};
const adminPanelTabReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case styleActionTypes.DISPLAY_ADMIN_MENU_ITEM:
			return { ...state, tab: payload };

		default:
			return { ...state, tab: "" };
	}
};
export const overlayReducer = combineReducers({
	login: loginOverlayReducer,
	signup: signupOverlayReducer,
	menuItem: menuItemReducer,
	userPanel: logedUserPanelReducer,
	adminPanel: adminPanelTabReducer,
});
