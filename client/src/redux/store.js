//jshint esversion:9
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

function saveToLocalStorage(state) {
	const serializedState = JSON.stringify(state);
	localStorage.setItem("state", serializedState);
}

function loadFromLocalStorage() {
	const serializedState = localStorage.getItem("state");
	if (serializedState === null) return undefined;
	return JSON.parse(serializedState);
}

let persistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducers,
	persistedState,
	composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
