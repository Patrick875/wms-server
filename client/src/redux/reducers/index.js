import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { ordersReducer } from "./orderReducer";
import { productsReducer, selectedProductReducer } from "./productsReducer";
import { overlayReducer } from "./stylesReducer";
import { paymentsReducer } from "./paymentsReducer";

const reducers = combineReducers({
	allProducts: productsReducer,
	product: selectedProductReducer,
	styles: overlayReducer,
	auth: authReducer,
	orders: ordersReducer,
	payment: paymentsReducer,
});
export default reducers;
