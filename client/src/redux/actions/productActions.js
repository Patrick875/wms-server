import { myDreamWeddingApi } from "../../API/Api";
import { productActionTypes } from "../constants/productActionTypes";
import { postData } from "./../../API/Api";
import { toast } from "react-toastify";

export const fetchProducts = () => {
	return async function (dispatch) {
		const cakes = await myDreamWeddingApi
			.get("/cakes")
			.catch((err) => console.log(`ERROR FETCHING BANDS`, err.message));

		const bands = await myDreamWeddingApi.get("/band").catch((err) => {
			console.log(`ERROR FETCHING BANDS`, err.message);
		});
		const flowers = await myDreamWeddingApi.get("/flowers").catch((err) => {
			console.log(`ERROR FETCHING FLOWERS`, err.message);
		});
		const bridesmaids = await myDreamWeddingApi
			.get("/bridesmaids")
			.catch((err) => {
				console.log("ERROR FETCHING BRIDESMAIDS", err.message);
			});
		const groomsmaids = await myDreamWeddingApi
			.get("/groomsmaids")
			.catch((err) => {
				console.log("ERROR FETCHING GROOMSMAIDS", err.message);
			});
		const cars = await myDreamWeddingApi.get("/cars").catch((err) => {
			console.log("ERROR FETCHING CARS", err.message);
		});
		const catering = await myDreamWeddingApi.get("/catering").catch((err) => {
			console.log("ERROR FETCHING CATERING", err.message);
		});
		const shoes = await myDreamWeddingApi.get("/shoe").catch((err) => {
			console.log("ERROR FETCHING CHOIR", err.message);
		});
		const itorero = await myDreamWeddingApi.get("/itorero").catch((err) => {
			console.log("ERROR FETCHING CHOIR", err.message);
		});
		const singers = await myDreamWeddingApi.get("/singer").catch((err) => {
			console.log("ERROR FETCHING CHOIR", err.message);
		});
		const costumes = await myDreamWeddingApi.get("/costumes").catch((err) => {
			console.log(" ERROR FETCHING COSTUMES", err.messge);
		});
		const decorations = await myDreamWeddingApi
			.get("/decoration")
			.catch((err) => {
				console.log("ERROR FETCHING DECORATION", err.message);
			});
		const djs = await myDreamWeddingApi.get("/dj").catch((err) => {
			console.log("ERROR FETCHING DJS", err.message);
		});
		const dresses = await myDreamWeddingApi.get("/dress").catch((err) => {
			console.log("ERROR FETCHING DJS", err.message);
		});
		const hairstyles = await myDreamWeddingApi
			.get("/hairstyles")
			.catch((err) => {
				console.log("ERROR FETCHING HAIRSTYLES", err.message);
			});
		const locations = await myDreamWeddingApi.get("/location").catch((err) => {
			console.log("ERROR FETCHING LOCATION", err.message);
		});
		const makeups = await myDreamWeddingApi.get("/makeup").catch((err) => {
			console.log("ERROR FETCHING MAKEUP", err.message);
		});
		const pastors = await myDreamWeddingApi.get("/pastor").catch((err) => {
			console.log("ERROR FETCHING PASTORS", err.message);
		});
		const churchs = await myDreamWeddingApi.get("/church").catch((err) => {
			console.log("ERROR FETCHING CHURCHS", err.message);
		});
		const invitations = await myDreamWeddingApi
			.get("/invitation")
			.catch((err) => {
				console.log("ERROR FETCHING INVITATIONS", err.message);
			});
		const rings = await myDreamWeddingApi.get("/rings").catch((err) => {
			console.log("ERROR FETCHING RINGS", err.message);
		});
		const mcs = await myDreamWeddingApi.get("/mc").catch((err) => {
			console.log("ERROR FETCHING MC", err.message);
		});
		const photoandvideos = await myDreamWeddingApi
			.get("/photoandvideo")
			.catch((err) => {
				console.log("ERROR FETCHING PHOTOANDVIDEO", err.message);
			});
		let allProducts = [];
		const getAllProducts = (...responses) => {
			responses.map((response) => {
				let obj = Object.keys(response.data.data);
				console.log();
				allProducts = [...allProducts, ...response.data.data[obj]];
			});
		};

		getAllProducts(
			bands,
			shoes,
			singers,
			itorero,
			photoandvideos,
			mcs,
			makeups,
			locations,
			hairstyles,
			djs,
			dresses,
			decorations,
			costumes,
			catering,
			cars,
			bridesmaids,
			cakes,
			groomsmaids,
			flowers,
			pastors,
			rings,
			invitations,
			churchs
		);
		console.log(allProducts);
		dispatch({
			type: productActionTypes.FETCH_PRODUCTS,
			payload: allProducts,
		});
	};
};
export const setSelectedProduct = (product) => {
	return {
		type: productActionTypes.SELECTED_PRODUCT,
		payload: product,
	};
};
export const clearSelectedProduct = () => {
	return {
		type: productActionTypes.REMOVE_SELECTED_PRODUCT,
		payload: {},
	};
};
export const setProducts = (products, category) => {
	const selectedProducts = products.filter((product) =>
		product.category === category ? product : null
	);
	return {
		type: productActionTypes.SET_PRODUCTS,
		payload: selectedProducts,
	};
};

export const createProduct = (product) => {
	return async function (dispatch) {
		try {
			const newProduct = await postData(product);
			dispatch({
				type: productActionTypes.CREATE_PRODUCT,
				payload: newProduct,
			});
			toast.success("product added to database");
		} catch (err) {
			toast.error("An error occured failed to upload product");
		}
	};
};
export const updateDatesAfterOrder = (productId, date) => {
	return {
		type: productActionTypes.UPDATED_DATE_AFTER_ORDER,
		payload: { productId, date },
	};
};
export const updateProduct = (productId, data, endpoint) => {
	return async function (dispatch) {
		console.log("data", data);
		try {
			const updatedProduct = await myDreamWeddingApi
				.patch(`/${endpoint}/${productId}`, data)
				.catch((err) => {
					console.log({ err });
				});
			const product = updatedProduct ? updatedProduct.data.data : data;
			console.log("PATRICK UPDATE THIS", product);
			dispatch({
				type: productActionTypes.UPDATE_PRODUCT,
				payload: product[Object.keys(product)[0]],
			});
			toast.success(`${data.name} updated`);
		} catch (error) {
			console.log({ error });
			toast.error(`${data.name} failed to updated `);
			dispatch({
				type: productActionTypes.UPDATE_PRODUCT,
				payload: {},
			});
		}
	};
};
export const hideProduct = (productId) => {
	return {
		type: productActionTypes.HIDE_PRODUCT,
		payload: productId,
	};
};
export const deleteProduct = (product, endpoint) => {
	return async function (dispatch) {
		const data = await myDreamWeddingApi.delete(`/${endpoint}/${product}`);
		console.log(data);
		dispatch({
			type: productActionTypes.DELETE_PRODUCT,
			payload: product,
		});
	};
};
