import { myDreamWeddingApi } from "../../API/Api";
import { userActionTypes } from "./../constants/userActionTypes";
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
				payload: updatedUser.updatedUser,
			});
		}
	};
};
