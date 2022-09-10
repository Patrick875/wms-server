import React from "react";

function GalleryCard({ image, coupleName }) {
	return (
		<div className="card my-1" style={{ width: "18rem" }}>
			<img className="card-img-top col-3" src={image} alt="Card  cap" />
			<div className="card-body text-center">
				<h5 className="card-title">{coupleName}</h5>
				<p className="card-text">Simply awesome</p>
				<p className="card-text">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit quisquam
					vitae magnam?
				</p>
			</div>
		</div>
	);
}

export default GalleryCard;
