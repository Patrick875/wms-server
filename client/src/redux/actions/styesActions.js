import { styleActionTypes } from "../constants/styleActionTypes";

export const displayLoginPanel = (payload) => {
	return {
		type: styleActionTypes.DISPLAY_LOGIN_PANEL,
		payload,
	};
};
export const displaySignupPanel = (payload) => {
	return {
		type: styleActionTypes.DISPLAY_SIGNUP_PANEL,
		payload,
	};
};
export const displayUserMenuItem = (payload) => {
	return {
		type: styleActionTypes.DISPLAY_USERMENU_ITEM,
		payload,
	};
};
export const displayAdminMenuItem = (payload) => {
	return {
		type: styleActionTypes.DISPLAY_ADMIN_MENU_ITEM,
		payload,
	};
};
export const displayLogedInUserPanel = (payload) => {
	return {
		type: styleActionTypes.DISPLAY_LOGEDIN_USER_PANEL,
		payload,
	};
};
