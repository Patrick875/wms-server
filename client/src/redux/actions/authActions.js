import { toast } from "react-toastify";
import { myDreamWeddingApi } from "../../API/Api";
import { authActionTypes } from "../constants/authActionTypes";
import { userActionTypes } from "../constants/userActionTypes";

export const isAuth = (payload) => {
	return {
		type: authActionTypes.IS_AUTH,
		payload,
	};
};

export const signup = (data) => {
	return async function (dispatch) {
		console.log("HERERERERE 🧨🧨🧨🧨🧨🧨");
		const user = await myDreamWeddingApi
			.post("/users/signup", data)
			.catch((err) => {
				toast.error(err.response.data.message, {
					position: toast.POSITION.TOP_CENTER,
				});
				//console.log("sign-up error", err.response.data.message);
				dispatch({
					type: authActionTypes.LOGIN,
					payload: {
						isAuth: false,
						user: {
							error: "signup failed",
						},
					},
				});
			});

		if (user) {
			toast.success("Signup successful");
			dispatch({
				type: authActionTypes.SIGN_UP,
				payload: {
					isAuth: true,
					jwt: user.data.token,
					user: user.data.user,
				},
			});
		}
	};
};
export const login = (data) => {
	return async function (dispatch) {
		console.log("HERERERERE 🧨🧨🧨🧨🧨🧨");
		const user = await myDreamWeddingApi
			.post("/users/login", data)
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log({ err });
				dispatch({
					type: authActionTypes.LOGIN,
					payload: {
						isAuth: false,
						user: {
							error: "login failed",
						},
					},
				});
			});

		if (user) {
			dispatch({
				type: authActionTypes.LOGIN,
				payload: {
					isAuth: true,
					jwt: user.data.token,
					user: user.data.user,
				},
			});
		}
	};
};
export const updateUser = (userData) => {
	return async function (dispatch) {
		const updatedUser = await myDreamWeddingApi
			.patch("/users", userData)
			.catch((err) => {
				dispatch({
					type: userActionTypes.UPDATE_USER,
					payload: {
						isAuth: false,
						error: {
							name: err.name,
							message: err.message,
						},
					},
				});
			});
		if (updatedUser) {
			console.log("updatedUser", updatedUser);
			dispatch({
				type: userActionTypes.UPDATE_USER,
				payload: updatedUser.data.updatedUser,
			});
		}
	};
};

export const logout = () => {
	return async function (dispatch) {
		const data = await myDreamWeddingApi.get("/users/logout");
		console.log("LOGOUT RESPONSE", data);
		window.localStorage.removeItem("state");
		dispatch({
			type: authActionTypes.LOGOUT,
			payload: {},
		});
	};
};
