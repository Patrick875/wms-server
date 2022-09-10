//jshint esversion:9
import { useEffect } from "react";
import { ToastContainer, Flip, toast } from "react-toastify";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Hospitality from "./Pages/Hospitality";
import Clothing from "./Pages/Clothing";
import BridesmaidsAndGroomsmaids from "./Pages/BridesmaidsAndGroomsmaids";
import Sound from "./Pages/Sound";
import Makeup from "./Pages/Makeup";
import PhotoAndVideo from "./Pages/PhotoAndVideo";
import ItemPage from "./Pages/ItemPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import AdminPage from "./Pages/Admin/AdminPage";
import { getAllOrders } from "./redux/actions/adminActions";
import { getUserOrders, clearOrders } from "./redux/actions/orderActions";
//customs css
import "./customStyles.css";
import "remixicon/fonts/remixicon.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";
import { logout } from "./redux/actions/authActions";

toast.configure();
TimeAgo.addDefaultLocale(en);
function App() {
	const notAuthenticated = Cookies.get("jwt") === undefined ? true : false;
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const products = useSelector((state) => state.allProducts.products);
	const isAuth = useSelector((state) =>
		state.auth.user ? state.auth.user.isAuth : null
	);
	useEffect(() => {
		if (notAuthenticated) {
			dispatch(logout());
			dispatch(clearOrders());
		} else {
			if (user && user.role === "admin") {
				dispatch(getAllOrders);
			} else if (user && user.role === "user") {
				dispatch(getUserOrders(user._id));
			} else {
				return null;
			}
		}
	}, [isAuth]);
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<ToastContainer transition={Flip} />
				<Route path="/admin">
					{user && user.role === "admin" ? <AdminPage /> : <Redirect to="/" />}
				</Route>

				<Switch>
					<Route exact path="/">
						<Home />
					</Route>

					<Route exact path="/hospitality">
						<Hospitality />
					</Route>
					<Route exact path={`/hospitality/:itemId`}>
						<ItemPage />
					</Route>
					<Route exact path="/clothing">
						<Clothing />
					</Route>
					<Route exact path="/clothing/:itemId">
						<ItemPage />
					</Route>
					<Route exact path="/bridesGroomsmaids">
						<BridesmaidsAndGroomsmaids />
					</Route>
					<Route exact path="/bridesGroomsmaids/:itemId">
						<ItemPage />
					</Route>
					<Route exact path="/sound">
						<Sound />
					</Route>
					<Route exact path="/sound/:itemId">
						<ItemPage />
					</Route>
					<Route exact path="/makeup">
						<Makeup />
					</Route>
					<Route exact path="/makeup/:itemId">
						<ItemPage />
					</Route>
					<Route exact path="/camerawork">
						<PhotoAndVideo />
					</Route>
					<Route exact path="/camerawork/:itemId">
						<ItemPage />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
