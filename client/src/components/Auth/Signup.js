import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	displayLoginPanel,
	displaySignupPanel,
} from "../../redux/actions/styesActions";
import { signUpSchema } from "./formValidation";
import { signup } from "../../redux/actions/authActions";
import { useDropzone } from "react-dropzone";
import { PropagateLoader } from "react-spinners";

function Label({ text }) {
	return (
		<label htmlFor={`exampleInput${text}1`} className={"my-1 "}>
			{text}
		</label>
	);
}

function Signup() {
	//display
	console.log("SIGN_UP");
	const cities = ["Kigali", "Southern", "Northern", "Western", "Eastern"];

	const [loading, setLoading] = useState(null);
	const [profileImage, setProfileImage] = useState([]);
	let display = useSelector((state) => state.styles.signup.displaySignupPanel);
	let dispatch = useDispatch();
	const handleShowLogin = () => {
		dispatch(displaySignupPanel(false));
		dispatch(displayLoginPanel(true));
	};
	const handleCloseButton = () => {
		return function () {
			dispatch(displaySignupPanel(false));
		};
	};
	//form-data
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ resolver: yupResolver(signUpSchema) });
	const onDropProfile = useCallback((acceptedFiles, rejectedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				setProfileImage((prev) => [...prev, reader.result]);
			};
			reader.readAsDataURL(file);
			console.log(file);
		});
	}, []);
	const { getInputProps: getProfileInputProps, getRootProps: getProfileProps } =
		useDropzone({
			onDrop: onDropProfile,
			accept: "image/png,image/jpg,image/jpeg",
		});

	const onSubmit = (data) => {
		data = { ...data, profileImage: profileImage[0] };
		console.log(data);
		console.log(errors);
		setLoading(true);
		data.location = {
			adress: data.adress,
			city: data.city,
		};
		dispatch(signup(data));
		setLoading(false);
		reset();
		setProfileImage([]);
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
						<h3 className="card-title text-center col-9 mt-3">Signup</h3>
						<i
							className="ri-close-line ri-xl text-muted ms-4 col"
							role="button"
							onClick={handleCloseButton()}></i>
					</div>

					<div className="mx-4 form-group">
						<Label text="Firstname and LastName" />
						<input
							type="text"
							className="form-control my-2"
							id="exampleInputText1"
							aria-describedby="emailHelp"
							placeholder="Enter your names"
							{...register("names", { required: true })}
						/>
						{errors.names && (
							<small id="emailHelp" className="form-text text-muted">
								{errors.names && errors.names.message}
							</small>
						)}
					</div>

					<div className="mx-4 form-group">
						<Label text="Email" />
						<input
							type="email"
							className="form-control my-2"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter your email"
							{...register("email", { required: true })}
						/>
						{errors.email && (
							<small id="emailHelp" className="form-text text-muted">
								{errors.email && errors.email.message}
							</small>
						)}
					</div>
					<div className="mx-4 form-group">
						<Label text="ID" />
						<input
							type="text"
							className="form-control my-2"
							id="exampleInputEmail2"
							aria-describedby="emailHelp"
							placeholder="Enter National ID"
							{...register("nationalId", { required: true })}
						/>
						{errors.email && (
							<small id="emailHelp" className="form-text text-muted">
								{errors.nationalId && errors.nationalId.message}
							</small>
						)}
					</div>
					<div className="mx-4 form-group">
						<Label text="Telephone" />
						<input
							type="text"
							className="form-control my-2"
							id="exampleInputEmail3"
							aria-describedby="emailHelp"
							placeholder="Enter your tel"
							{...register("telephone", { required: true })}
						/>
						{errors.email && (
							<small id="emailHelp" className="form-text text-muted">
								{errors.telephone && errors.telephone.message}
							</small>
						)}
					</div>
					<div className="form-group mx-4">
						<Label text="Address" />
						<input
							placeholder="address"
							className="form-control"
							id="exampleInputAdress"
							aria-describedby="emailHelp"
							{...register("address")}
						/>
					</div>
					<div className="mx-4 form-group">
						<Label text="City/Province" />

						<select
							className="form-select"
							aria-label="Default select example"
							{...register("city")}>
							<option defaultValue="---">---</option>
							{cities.map((city, i) => (
								<option value={city} key={i + "index"}>
									{city === "Kigali" ? city : `${city} province`}
								</option>
							))}
						</select>
					</div>
					<label className="my-2 mx-4">Profile picture</label>
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
					{profileImage.length > 0 ? (
						<div className="row">
							<div className="img-container col">
								<i
									className=" btn btn-sm btn-danger ri-delete-bin-5-line ri-1x overay-btn "
									onClick={() => setProfileImage([])}
								/>

								<img
									src={profileImage[0]}
									className="selected-image me-2 rounded "
									alt="profile"
								/>
							</div>
						</div>
					) : null}
					<div className="mx-4 form-group">
						<Label text="Password" />
						<input
							type="password"
							className="form-control my-2"
							id="exampleInputPassword1"
							placeholder="Enter your password"
							{...register("password", { required: true })}
						/>
						<small id="emalHelp" className="form-text text-muted">
							{errors.password && errors.password.message}
						</small>
					</div>
					<div className="mx-4 form-group">
						<Label text="Confirm password" />
						<input
							type="password"
							className="form-control my-2"
							id="exampleInputPassword2"
							placeholder="Confirm password"
							{...register("confirmPassword", { required: true })}
						/>
						<small id="emailHelp" className="form-text text-muted">
							{errors.confirmPassword && errors.confirmPassword.message}
						</small>
					</div>

					<div className="form-group form-check mx-4">
						<input
							type="checkbox"
							className="form-check-input"
							id="exampleCheck1"
							{...register("terms", { required: true })}
						/>
						<label className="form-check-label" htmlFor="exampleCheck1">
							Agree to our <Link to="#">terms and conditions</Link>
						</label>
						<p className="text-muted form-text mt-2">
							{" "}
							{errors.terms && errors.terms.message}
						</p>
					</div>
					<button
						type="submit"
						className="btn  mt-3 mb-2 mx-4 form-button text-white"
						style={{ backgroundColor: "#E6AC69" }}>
						Signup
					</button>

					<p className="font-weight-bold mx-4 mt-2">
						Already have an account ?
					</p>
					<Link
						to="#"
						onClick={() => handleShowLogin()}
						className="nav-link ps-0 mx-4"
						style={{ color: "#2B81A5" }}>
						Login
					</Link>
				</form>
			)}
		</div>
	);
}

export default Signup;
