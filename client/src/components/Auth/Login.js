import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import {
	displayLoginPanel,
	displaySignupPanel,
} from "../../redux/actions/styesActions";
import { loginSchema } from "./formValidation";
import { login } from "../../redux/actions/authActions";
import { toast } from "react-toastify";

function Label({ text }) {
	return (
		<label htmlFor={`exampleInput${text}1`} className={"my-1 "}>
			{text}
		</label>
	);
}

function Login() {
	//form-display
	const userError = useSelector((state) =>
		state.auth.user && state.auth.user.error ? state.auth.user.error : false
	);

	const [loading, setLoading] = useState(null);
	let display = useSelector((state) => state.styles.login.displayLoginPanel);
	let dispatch = useDispatch();
	const handleShowSignup = () => {
		dispatch(displayLoginPanel(false));
		dispatch(displaySignupPanel(true));
	};
	const handleCloseButton = () => {
		return function () {
			dispatch(displayLoginPanel(false));
			console.log("😂😂😂😂😂");
		};
	};
	const handleLogin = () => {
		return function () {
			dispatch(displayLoginPanel(false));
			console.log("HANDLE LOGIN");
		};
	};
	//form data
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();
	//{resolver: yupResolver(loginSchema),}
	// const notify = () => {
	// 	toast.error("login failed");
	// };
	const onSubmit = (data) => {
		setLoading(true);
		handleLogin();
		console.log(data);
		dispatch(login(data));

		//reset();
	};

	return (
		<div
			className={`login-form login `}
			style={{
				display: `${display} `,
				visibility: `${display ? "visible" : "hidden"}`,
			}}>
			{loading ? (
				<div className="d-flex flex-row justify-content-center h-100 align-items-center">
					<PropagateLoader color="orange" loading={loading} size={15} />
				</div>
			) : (
				<form
					className="mx-2 d-flex flex-column"
					onSubmit={handleSubmit(onSubmit)}>
					<div className="d-flex flex-row align-items-center mt-4">
						<h3 className="card-title text-center col-9 mt-3">Login</h3>
						<i
							className="ri-close-line ri-xl text-muted ms-4 col"
							role="button"
							onClick={handleCloseButton()}></i>
					</div>
					<div className="mx-4 form-group">
						<Label text="Email/Tel" />
						<input
							required
							className="form-control my-2"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter your email or phone number"
							{...register("user", { required: true })}
						/>
					</div>
					<div className="mx-4 form-group">
						<Label text="Password" />
						<input
							type="password"
							required
							className="form-control my-2"
							id="exampleInputPassword1"
							placeholder="Enter your password"
							{...register("password", { required: true })}
						/>
						{errors.password && (
							<small id="emailHelp" className="form-text text-muted">
								{errors.password.message}
							</small>
						)}
					</div>
					<Link
						to="#"
						className="nav-link ps-0 mx-4"
						style={{ color: "#2B81A5" }}>
						Forgot your password
					</Link>
					<button
						type="submit"
						className="btn  mt-3 mb-2 mx-4 form-button text-white"
						style={{ backgroundColor: "#E6AC69" }}>
						Login
					</button>

					<p className="font-weight-bold mx-4 mt-2">Dont have an account ?</p>
					<Link
						to="#"
						onClick={() => handleShowSignup()}
						className="nav-link ps-0 mx-4"
						style={{ color: "#2B81A5" }}>
						Signup
					</Link>
				</form>
			)}
		</div>
	);
}

export default Login;
// <div className="row d-flex flex-row align-items-center mt-4 mb-2">
//
// </div>;

// {
// 	errors.user && (
// 		<small id="emailHelp" className="form-text text-muted">
// 			please a valid email
// 		</small>
// 	);
// }
