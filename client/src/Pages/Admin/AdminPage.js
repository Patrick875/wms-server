import { useCallback, useEffect, useRef, useState, forwardRef } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "react-pro-sidebar/dist/css/styles.css";
import SideBar from "./SideBar";
import AdminTopNav from "./AdminTopNav";
import ItemCard from "../../components/ItemCard";
import Products from "./Products";
import Pagination from "./Pagination";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import Orders from "./Orders";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllOrders } from "../../redux/actions/orderActions";
import AdminTable from "./AdminTable";
import RevenueTable from "../../components/Admin/RevenueTable";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { updateUser } from "../../redux/actions/authActions";

const Dashboard = forwardRef(({ numberOfProducts }) => {
	const orders = useSelector((state) => state.orders.orders);
	const totalRevenue =
		orders && !("error" in orders)
			? orders
					.map((order) => order.product.price * order.product.quantity)
					.reduce((prev, curr) => prev + curr, 0)
			: 0;
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);

	const indexOfLastPage = currentPage * postsPerPage;
	const indexOfFirstPage = indexOfLastPage - postsPerPage;
	const currentPageOrders =
		orders && !orders.error
			? orders.slice(indexOfFirstPage, indexOfLastPage)
			: [];
	console.log("dashboard", totalRevenue);
	//change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="container">
			<div className="row card">
				<div className=" py-2 d-flex flex-row justify-content-between ">
					<div className="col-xl-3 col-sm-6 col-12">
						<div className="card">
							<div className="card-content">
								<div className="card-body shadow">
									<div className="media   d-flex flex-row justify-content-between p-3">
										<div className="align-self-center">
											<i
												className="ri-shopping-bag-fill ri-3x primary font-large-2 float-left"
												style={{ color: "#01ad51" }}></i>
										</div>
										<div className="media-body text-center">
											<h3>{numberOfProducts}</h3>
											<span>Products</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-3 col-sm-6 col-12">
						<div className="card">
							<div className="card-content">
								<div className="card-body shadow">
									<div className="media d-flex flex-row justify-content-between p-3">
										<div className="align-self-center">
											<i
												className="ri-shopping-cart-fill ri-3x primary font-large-2 float-left"
												style={{ color: "#01ad51" }}></i>
										</div>
										<div className="media-body text-center">
											<h3>{orders && !orders.error ? orders.length : 0}</h3>
											<span>Orders</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-3 col-sm-6 col-12">
						<div className="card">
							<div className="card-content">
								<div className="card-body shadow">
									<div className="media d-flex flex-row justify-content-between p-3">
										<div className="align-self-center">
											<i
												className="ri-money-pound-circle-line ri-3x primary font-large-2 float-left"
												style={{ color: "#01ad51" }}></i>
										</div>
										<div className="media-body text-center">
											<h3>{totalRevenue}</h3>
											<span>Total revenue</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className=" py-2 d-flex flex-row justify-content-between">
					<div className="card col shadow ">
						<AdminTable orders={currentPageOrders} />
						<Pagination
							postsPerPage={postsPerPage ? postsPerPage : 0}
							totalPosts={orders ? orders.length : 0}
							paginate={paginate}
						/>
					</div>
				</div>
			</div>
			<div className="row"></div>
		</div>
	);
});

const Revenue = () => {
	const orders = useSelector((state) =>
		state.orders.orders && !("error" in state.orders.orders)
			? state.orders.orders
			: null
	);
	const activatedOrders = orders
		? orders.filter((order) => (order.activated ? order : null))
		: null;
	console.log("ACTIVATED ORDERS", activatedOrders);
	return (
		<div>
			<AdminTopNav />
			<RevenueTable activatedOrders={activatedOrders} />
		</div>
	);
};

const AdminProfile = () => {
	const [image, setImage] = useState([]);
	const onDropImage = useCallback((acceptedFiles, rejectedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				setImage((prev) => [...prev, reader.result]);
			};
			reader.readAsDataURL(file);
			console.log(file);
		});
	}, []);
	const { getInputProps: getProfileInputProps, getRootProps: getProfileProps } =
		useDropzone({
			onDrop: onDropImage,
			accept: "image/png,image/jpg,image/jpeg",
		});
	const dispatch = useDispatch();

	let { names, telephone, email, profileImage } = useSelector(
		(state) => state.auth.user
	);
	const userProfile =
		profileImage && profileImage.length !== 0 ? profileImage[0] : null;
	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
	} = useForm({
		defaultValues: {
			names: names,
			telephone: telephone,
			email: email,
		},
	});
	const currentValues = watch();
	const onSubmit = (data) => {
		data.profileImage = image[0];
		console.log(data);
		dispatch(updateUser(data));
	};

	return (
		<div className="container ">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-4  d-flex flex-row justify-content-center">
					<div className="d-flex flex-col mb-4">
						<div className="avatar-holder">
							<img src={userProfile} alt={`${names} profile`} />
						</div>
						<div className="mx-4 form-group " {...getProfileProps()}>
							<i className="ri-upload-cloud-2-line ri-3x rounded px-3 border border-dark" />
							<p className="fw-bold text-muted">Upload profile picture</p>
							<input
								className="form-control"
								type="file"
								id="formFile"
								style={{ visibility: "hidden", display: "none" }}
								{...getProfileInputProps()}
							/>
						</div>
					</div>
					{image.length > 0 ? (
						<div className="row">
							<div className="img-container col">
								<i
									className=" btn btn-sm btn-danger ri-delete-bin-5-line ri-1x overay-btn "
									onClick={() => setImage([])}
								/>

								<img
									src={image[0]}
									className="selected-image me-2 rounded "
									alt="profile"
								/>
							</div>
						</div>
					) : null}
				</div>

				<div className="user-data  d-flex flex-column justify-content-around">
					<p className="fs-4 text-center">Contact</p>
					<div className="my-2">
						<label className="fs-5">Names</label>
						<input
							placeholder="price"
							className="form-control"
							id="exampleInputEmail"
							aria-describedby="emailHelp"
							{...register("names")}
						/>
					</div>
					<div className="my-2">
						<label className="fs-5">Email </label>
						<input
							placeholder="email"
							className="form-control"
							id="exampleInputEmail"
							aria-describedby="emailHelp"
							{...register("email")}
						/>
					</div>

					<div className="my-2">
						<label className="fs-5">Phone</label>
						<input
							placeholder="Phone"
							className="form-control"
							id="exampleInputTelephone"
							aria-describedby="emailHelp"
							{...register("telephone")}
						/>
					</div>

					<div className="d-flex flex-row my-4 justify-content-between">
						<button
							type="button"
							data-bs-dismiss="modal"
							className="btn mx-3 fw-bold shadow"
							style={{ backgroundColor: "rgb(210,210,210)" }}>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-primary fw-bold shadow"
							onClick={() => handleSubmit(onSubmit)}>
							Save changes
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

function AdminPage() {
	const dispatch = useDispatch();
	const categories = useSelector(
		(state) => state.allProducts.constants.categories
	);
	const products = useSelector((state) => state.allProducts.products);
	const orders = useSelector((state) => state.orders.orders);
	console.log("number of products", products.length);
	let selectedProducts = [];
	const tab = useSelector((state) => state.styles.adminPanel.tab);
	const { path } = useRouteMatch();
	const selectProducts = (category) => {
		return products.filter((product) =>
			product.category.includes(category) ? product : null
		);
	};
	const sideMenuTabs = [
		"AllProducts",
		"Hospitality",
		"Clothing",
		"Makeup-Hairstyles",
		"Brides-Groomsmaids",
		"Sound-Music",
		"Photography-Videography",
	];
	useEffect(() => {
		dispatch(getAllOrders());
	}, []);
	return (
		<div className="d-flex flex-row " style={{ backgroundColor: "#f7f7f7" }}>
			<SideBar />
			<div className="mx-2 col-9">
				<Switch>
					<Route path={`${path}/profile`}>
						<AdminProfile />
					</Route>
					<Route exact path={`${path}`}>
						<Dashboard numberOfProducts={products.length} />
					</Route>
					<Route path={`${path}/addProduct`}>
						<AddProduct />
					</Route>
					<Route path={`${path}/allProducts`}>
						<Products categories={categories} products={products} />
					</Route>
					{categories.map((tab) => {
						selectedProducts = selectProducts(tab);
						return (
							<Route path={`${path}/${tab}`} key={tab}>
								<Products products={selectedProducts} />
							</Route>
						);
					})}
					<Route exact path={`${path}/orders`}>
						<Orders />
					</Route>
					<Route exact path={`${path}/revenue`}>
						<Revenue />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default AdminPage;
