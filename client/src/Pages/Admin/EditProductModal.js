import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import EditProductConfirmationModal from "./EditProductConfirmationModal";

export default function EditProductModal({
	product,
	categories,
	subcategories,
}) {
	const format = "DD/MM/YY/HH:mm";
	const [dates, setDates] = useState(product.timeAvailable);
	const isTime = product.bookingType === "service" ? true : false;
	const [thumbnail, setThumbnail] = useState([product.thumbnail]);
	const [images, setimages] = useState([...product.images]);
	const [values, setValues] = useState(product);

	const {
		register,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: product.name,
			description: product.description,
			price: product.price,
			quantity: product.quantity,
			category: product.category,
			subcategory: product.subcategory,
		},
	});
	const onDropThumbnail = useCallback((acceptedFiles, rejectedFiles) => {
		console.log("whatsapp");
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				setThumbnail((prevState) => [...prevState, reader.result]);
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
			accept: "image/jpg,image/png,image/jpg",
		});
	//form functions
	const handleRemoveImage = (image) => {
		setimages(images.filter((el) => el !== image));
	};
	console.log(dates);
	console.log("come on", isTime);
	return (
		<div>
			<div
				className="modal fade"
				data-bs-keyboard="false"
				id={`staticBackdropEdit${product._id}`}
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-xl ">
					<div className="modal-content">
						<div className="card container-fluid">
							<h4 className="text-center my-3">Edit product details</h4>
							<form className="d-flex flex-column">
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
											<label for="floatingTextarea" className="form-label">
												Full Description
											</label>
											<div className="form-floating">
												<textarea
													className="form-control pt-2"
													style={{ height: "170px" }}
													{...register("description")}
													placeholder="Leave a comment here"
													id="floatingTextarea"></textarea>
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
													{...register("price")}
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
													disabled
													{...register("category")}>
													<option selected>---</option>
													{categories.map((category) => (
														<option value={category}>{category}</option>
													))}
												</select>
											</div>
											{product.category !== "---" ? (
												<div>
													<label className="form-label">Subcategory</label>
													<select
														className="form-select"
														aria-label="Default select example"
														{...register("subcategory")}>
														<option selected>{product.subcategory}</option>
														{subcategories[product.category].map(
															(subcategory) => (
																<option value={subcategory}>
																	{subcategory}
																</option>
															)
														)}
													</select>
												</div>
											) : (
												<div className="form-disabled">
													<label className="form-label">Subcategory</label>
													<select
														className="form-select"
														aria-label="Default select example"
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
											{product.category === "clothing" ? (
												<div className="mb-3">
													<label
														for="exampleInputEmail1"
														className="form-label">
														Quantity/Stock available
													</label>
													<input
														placeholder="Items in stock"
														type="text"
														className="form-control"
														id="exampleInputEmail1"
														{...register("quantity")}
														aria-describedby="emailHelp"
													/>
												</div>
											) : null}
											{isTime ? (
												<div className="mb-3">
													<label
														for="exampleInputEmail1"
														className="form-label">
														Time available
													</label>
													<div className="col">
														<DatePicker
															inputClass="form-control "
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
														{dates && dates.length !== 0 ? (
															dates.map((date) =>
																typeof date !== "object" ? (
																	<p className="col">{date}</p>
																) : (
																	<p className="col">{date.format(format)}</p>
																)
															)
														) : (
															<p>No dates selected</p>
														)}
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
												{thumbnail.length > 0 ? (
													<div className="row">
														<div className="img-container col">
															<i
																className=" btn btn-sm btn-danger ri-delete-bin-5-line ri-1x overay-btn "
																onClick={() => setThumbnail([])}
															/>

															<img
																src={thumbnail[0]}
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
																		onClick={() =>
																			handleRemoveImage(image, images)
																		}
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
								<div className="d-flex flex-row px-4 justify-content-end my-3 ">
									<button
										type="button"
										data-bs-dismiss="modal"
										className="btn mx-3 btn-sm col-2"
										style={{ backgroundColor: "rgb(210,210,210)" }}>
										Back
									</button>
									<button
										type="button"
										onClick={() => setValues(getValues())}
										data-bs-target={`#confirmProductUpdate${product._id}`}
										data-bs-toggle="modal"
										className="btn btn-primary btn-sm col-2">
										Save product
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<EditProductConfirmationModal
				productData={{
					...values,
					images,
					thumbnail: thumbnail[0],
					timeAvailable: dates,
				}}
				product={product}
				timeAvailable={dates}
			/>
		</div>
	);
}
