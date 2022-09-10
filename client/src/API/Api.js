//jshint esversion:9
import axios from "axios";
import { toast } from "react-toastify";

export const myDreamWeddingApi = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	withCredentials: true,
	credentials: "include",
});
export const postData = async (data) => {
	let endpoint = data.subcategory;
	if (data.subcategory === "transport") {
		endpoint = "cars";
	}
	if (data.category === "camerawork") {
		endpoint = "photoandvideo";
	}
	try {
		let response = await axios.post(
			`http://localhost:5000/api/v1/${endpoint}`,
			data,
			{
				withCredentials: true,
			}
		);

		return Object.values(response.data.data)[0];
	} catch (err) {
		console.log(err.name, err.message);
	}

	//return Object.values(data.data)[0]
};
export const getProducts = async () => {
	let allProducts = [];
	const cakes = await myDreamWeddingApi
		.get("/cakes")
		.catch((err) => console.log(`ERROR FETCHING BANDS`, err.message));

	const bands = await myDreamWeddingApi.get("/band").catch((err) => {
		console.log(`ERROR FETCHING BANDS`, err.message);
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
		console.log("ERROR FETCHING SHOE", err.message);
	});
	const itorero = await myDreamWeddingApi.get("/itorero").catch((err) => {
		console.log("ERROR FETCHING ITORERO", err.message);
	});
	const singers = await myDreamWeddingApi.get("/singer").catch((err) => {
		console.log("ERROR FETCHING SINGERS", err.message);
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
	const hairstyles = await myDreamWeddingApi.get("/hairstyle").catch((err) => {
		console.log("ERROR FETCHING HAIRSTYLES", err.message);
	});
	const locations = await myDreamWeddingApi.get("/location").catch((err) => {
		console.log("ERROR FETCHING LOCATION", err.message);
	});
	const makeups = await myDreamWeddingApi.get("/makeup").catch((err) => {
		console.log("ERROR FETCHING MAKEUP", err.message);
	});

	const mcs = await myDreamWeddingApi.get("/mc").catch((err) => {
		console.log("ERROR FETCHING MC", err.message);
	});
	const photoandvideos = await myDreamWeddingApi
		.get("/photoandvideo")
		.catch((err) => {
			console.log("ERROR FETCHING PHOTOANDVIDEO", err.message);
		});

	const getAllProducts = (...responses) => {
		responses.map((response) => {
			let obj = Object.keys(response.data.data);
			console.log();
			allProducts = [...allProducts, ...response.data.data[obj]];
		});
	};

	getAllProducts(
		itorero,
		singers,
		bands,
		shoes,
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
		pastors,
		rings,
		invitations,
		churchs
	);
	return allProducts;
};
