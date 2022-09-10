function CarouselItem({ image, active }) {
	return (
		<div className="carousel-item">
			<img className="d-block img-fluid" src={image} alt="Second slide" />
		</div>
	);
}

function Carousel() {
	return (
		<div
			id="carouselExampleControls"
			className="carousel slide  "
			data-bs-ride="carousel">
			<div className="carousel-inner ">
				<div className=" d-flex overlay align-items-center justify-content-center">
					<p className="h2 text-dark">Wedding Management System</p>
				</div>
				<div className="carousel-item active">
					<img src="/image1.png" className="d-block " alt="..." />
				</div>
				<div className="carousel-item">
					<img src="/image2.png" className="d-block " alt="..." />
				</div>
				<div className="carousel-item">
					<img src="/image3.png" className="d-block " alt="..." />
				</div>
				<div className="carousel-item">
					<img src="/image4.png" className="d-block " alt="..." />
				</div>
			</div>
			<button
				className="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleControls"
				data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button
				className="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleControls"
				data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div>
	);
}

export default Carousel;
