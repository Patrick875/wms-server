//jshint esversion:9
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { createProduct } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

function AddProduct() {
	const format = "DD/MM/YY/HH:mm";

	const [dates, setDates] = useState([]);

	const categories = useSelector(
		(state) => state.allProducts.constants.categories
	);
	const subcategories = useSelector(
		(state) => state.allProducts.constants.subcategories
	);
	//form-data

	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		data.price = price;
		data = { ...data, images: images, thumbnail: thumbImage[0] };
		const timeAvailable = dates.map((date) => date.format());
		data.timeAvailable = timeAvailable;
		dispatch(createProduct(data));
		reset();
		setDates([]);
		setimages([]);
		setThumbImage([]);
	};
	const category = watch("category", "---");
	const subcategory = watch("subcategory", "---");
	console.log(subcategory);
	//uploading images
	const [price, setPrice] = useState();
	const [thumbImage, setThumbImage] = useState([]);
	const [images, setimages] = useState([]);
	const handleRemoveImage = (image) => {
		setimages(images.filter((el) => el !== image));
	};

	const onDropThumbnail = useCallback((acceptedFiles, rejectedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				setThumbImage((prevState) => [...prevState, reader.result]);
			};
			reader.readAsDataURL(file);
			console.log(file);
		});
	}, []);

	const onDropImages = useCallback((acceptedFiles, rejectedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				setimages((prevState) => [...prevState, reader.result]);
			};
			reader.readAsDataURL(file);
			console.log(file);
		});
	}, []);
	const { getRootProps: getThumbProps, getInputProps: getThumbInputProps } =
		useDropzone({
			onDrop: onDropThumbnail,
			accept: "image/jpg,image/png,image/jpeg",
		});
	const { getRootProps: getImagesProps, getInputProps: getImageInputProps } =
		useDropzone({
			onDrop: onDropImages,
			accept: "image/jpg,image/png,image/jpeg",
		});
	return (
		<div className="card">
			<form onSubmit={handleSubmit(onSubmit)} className="row">
				<ol className="list-group list-group-numbered">
					<li className="list-group-item d-flex align-items-start">
						<div className="fw-bold col">General information</div>
						<div className="mb-3 col mx-3">
							<div className="mb-3">
								<label for="exampleInputEmail1" className="form-label">
									Product Name
								</label>
								<input
									placeholder="product name"
									type="text"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									{...register("name")}
								/>
							</div>
							<label for="comment" className="form-label">
								Full Description
							</label>
							<div className="form-floating">
								<textarea
									className="form-control pt-2"
									style={{ height: "170px" }}
									placeholder="Leave a comment here"
									id="comment"
									{...register("description")}></textarea>
							</div>
						</div>
					</li>
					<li className="list-group-item d-flex  align-items-start">
						<div className="fw-bold col">Pricing</div>
						<div className="mb-3 col mx-3">
							<div className="mb-3">
								<label for="exampleInputEmail1" className="form-label">
									Product price(rwf)
								</label>
								<input
									placeholder="price"
									className="form-control"
									id="exampleInputEmail189"
									aria-describedby="emailHelp"
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
						</div>
					</li>

					<li className="list-group-item d-flex align-items-start">
						<div className="fw-bold col">Category</div>
						<div className="mb-3 col mx-3">
							<div>
								<label className="form-label">Category</label>
								<select
									className="form-select dropdown"
									aria-label="Default select example"
									{...register("category", { required: true })}>
									<option selected>---</option>
									{categories.map((category) => (
										<option value={category}>{category}</option>
									))}
								</select>
							</div>
							{category && category !== "---" ? (
								<div>
									<label className="form-label">Subcategory</label>
									<select
										className="form-select"
										aria-label="Default select example"
										{...register("subcategory", { required: true })}>
										<option selected>---</option>
										{subcategories && subcategories.length !== 0
											? subcategories[category].map((subcategory) => (
													<option value={subcategory}>{subcategory}</option>
											  ))
											: null}
									</select>
								</div>
							) : (
								<div className="form-disabled">
									<label className="form-label">Subcategory</label>
									<select
										className="form-select"
										aria-label="Default select example"
										{...register("subcategory")}
										disabled>
										<option selected>---</option>
									</select>
								</div>
							)}
						</div>
					</li>
					<li className="list-group-item d-flex  align-items-start">
						<div className="fw-bold col">Additional Info</div>
						<div className="mb-3 col mx-3">
							{category && subcategory ? (
								[
									"hospitality",
									"sound",
									"bridesGroomsmaids",
									"camerawork",
								].includes(category) &&
								[
									"pastor",
									"band",
									"singer",
									"sound",
									"mc",
									"location",
									"church",
									"Itorero",
									"Dj",
									"bridesmaids",
									"groomsmaids",
									"photography",
									"videography",
								].includes(subcategory) ? (
									<div className="mb-3">
										<label for="exampleInputEmail1" className="form-label">
											Time Available
										</label>
										<div className="col-12">
											<DatePicker
												inputClass="form-control "
												minDate={new Date().setDate(new Date().getDate())}
												value={dates}
												onChange={setDates}
												multiple
												sort
												format={format}
												calendarPosition="bottom-center"
												plugins={[
													<DatePanel />,
													<TimePicker position="bottom" hideSeconds />,
												]}
											/>
										</div>
										<div className="row">
											{dates.length !== 0 ? (
												dates.map((date) => (
													<p className="col">{date.format()}</p>
												))
											) : (
												<p>No dates selected</p>
											)}
										</div>
									</div>
								) : null
							) : null}
							{category && category === "clothing" ? (
								<div>
									<div className="mb-3 col-6">
										<label for="exampleInputEmail109" className="form-label">
											Quantity
										</label>
										<div>
											<input
												className="form-control"
												type="number"
												{...register("quantity")}
											/>
										</div>
									</div>
								</div>
							) : null}
							{subcategory === "location" && category === "hospitality" ? (
								<div>
									<div className="mb-3 col-6">
										<label for="exampleInputEmail10" className="form-label">
											Link on google maps
										</label>
										<div>
											<input
												className="form-control"
												{...register("mapslink")}
											/>
										</div>
									</div>
								</div>
							) : null}
							{subcategory === "pastor" && category === "hospitality" ? (
								<div>
									<div className="mb-3 col-6">
										<label for="exampleInputEmail109" className="form-label">
											Church (where he/she is based)
										</label>
										<div>
											<input className="form-control" {...register("church")} />
										</div>
									</div>
								</div>
							) : null}
						</div>
					</li>
					<li className="list-group-item d-flex align-items-start ">
						<div className="fw-bold col">Media</div>
						<div className="d-flex col flex-column">
							<div className="mb-3 col">
								<label
									for="exampleInputEmail1"
									className="form-label fw-bolder">
									Showcase Image
								</label>
								<p>This image is used to showcase the product</p>
								<div
									className="d-flex flex-column align-items-center col-4"
									{...getThumbProps()}>
									<i className="ri-upload-cloud-2-line ri-3x rounded px-3 border border-dark" />
									<p className="fw-bold text-muted">Upload image</p>
									<input
										className="form-control"
										type="file"
										id="formFile"
										style={{ visibility: "hidden", display: "none" }}
										{...getThumbInputProps()}
									/>
								</div>
								{thumbImage.length > 0 ? (
									<div className="row">
										<div className="img-container col">
											<i
												className=" btn btn-sm btn-danger ri-delete-bin-5-line ri-1x overay-btn "
												onClick={() => setThumbImage([])}
											/>

											<img
												src={thumbImage[0]}
												className="selected-image me-2 rounded "
												alt="thumbimage"
											/>
										</div>
									</div>
								) : null}
							</div>
							<div className="mb-3 col mx-3">
								<label
									for="exampleInputEmail1"
									className="form-label fw-bolder">
									More images
								</label>
								<p>Add more images to highlight the product</p>
								<div
									className="d-flex flex-column align-items-center col-4"
									{...getImagesProps()}>
									<i className="ri-upload-cloud-2-line ri-3x rounded px-3 border border-dark" />
									<p className="fw-bold text-muted">Upload images</p>
									<input
										className="form-control"
										type="file"
										id="formFile"
										style={{ visibility: "hidden", display: "none" }}
										{...getImageInputProps()}
									/>
								</div>
								{images.length > 0 && (
									<div className="row">
										{images.map((image, index) => {
											return (
												<div className="img-container col">
													<i
														className=" btn btn-sm btn-danger ri-delete-bin-5-line ri-1x overay-btn "
														onClick={() => handleRemoveImage(image, images)}
													/>

													<img
														src={image}
														key={index}
														className="selected-image me-2 rounded "
														alt={image + index}
													/>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</div>
					</li>
				</ol>
				<div className="row justify-content-end my-3 ">
					<button
						type="submit"
						className="btn mx-3 btn-sm col-2"
						style={{ backgroundColor: "rgb(210,210,210)" }}>
						Cancel
					</button>

					<button type="submit" className="btn btn-primary btn-sm col-2">
						Save product
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddProduct;
