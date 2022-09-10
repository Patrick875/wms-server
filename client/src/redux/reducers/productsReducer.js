//jshint esversion:9
import { productActionTypes } from "../constants/productActionTypes";

const initialState = {
	constants: {
		subcategories: {
			hospitality: [
				"location",
				"catering",
				"cakes",
				"transport",
				"flowers",
				"decoration",
				"church",
				"invitation",
				"pastor",
			],
			makeup: ["makeup", "haircuts", "hairstyles"],
			sound: ["sound", "mc", "singer", "band", "Itorero", "Dj"],
			bridesGroomsmaids: ["bridesmaids", "groomsmaids"],
			camerawork: ["photography", "videography"],
			clothing: ["dress", "costumes", "shoe", "rings"],
		},
		categories: [
			"hospitality",
			"clothing",
			"makeup",
			"bridesGroomsmaids",
			"sound",
			"camerawork",
		],
	},
	products: [],
};

export const productsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case productActionTypes.SET_PRODUCTS:
			const products = payload.map((product) =>
				!product.hidden ? product : null
			);
			return { ...state, products };
		case productActionTypes.FETCH_PRODUCTS:
			console.log("fetch initial state", state);
			return { ...state, products: payload };
		case productActionTypes.CREATE_PRODUCT:
			let newProducts = state.products;
			return { ...state, products: [...newProducts, payload] };
		case productActionTypes.UPDATE_PRODUCT:
			console.log("RIGHT HERE", payload);
			if (Object.keys(payload) !== 0) {
				let updateProducts = state.products.map((product) =>
					product._id === payload._id ? { ...payload } : product
				);
				return {
					...state,
					products: updateProducts,
				};
			}
			return { ...state };
		case productActionTypes.UPDATED_DATE_AFTER_ORDER:
			console.log("HERE");
			products = state.products.map((product) =>
				product._id === payload.productId
					? product.timeAvailable.filter((date) =>
							date === payload.date ? null : date
					  )
					: product
			);
			return { ...state, products };
		case productActionTypes.HIDE_PRODUCT:
			let hideProduct = state.map((product) =>
				product.id === payload ? { ...product, hidden: true } : product
			);
			return { ...state, ...hideProduct };
		case productActionTypes.DELETE_PRODUCT:
			let remainingProducts = state.products.filter((product) =>
				!product._id === payload ? product : null
			);
			return {
				...state,
				products: remainingProducts,
			};

		default:
			return { ...state };
	}
};

export const selectedProductReducer = (state = {}, { type, payload }) => {
	switch (type) {
		case productActionTypes.SELECTED_PRODUCT:
			return { ...payload };
		case productActionTypes.REMOVE_SELECTED_PRODUCT:
			return { ...state };
		default:
			return state;
	}
};
