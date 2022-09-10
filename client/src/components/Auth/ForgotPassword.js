import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ForgotPassword() {
	const dispatch = useDispatch();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<div>
			<div
				className={`login-form login `}
				style={{
					display: `${display} `,
					visibility: `${display ? "visible" : "hidden"}`,
				}}>
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
						<Label text="Email" />
						<input
							required
							className="form-control my-2"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter your email"
							{...register("email", { required: true })}
						/>
						{errors.email && (
							<small id="emailHelp" className="form-text text-muted">
								please a valid email
							</small>
						)}
					</div>

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
			</div>
		</div>
	);
}

export default ForgotPassword;
