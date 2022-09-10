import React from "react";
import GalleryCard from "./GalleryCard";

function Gallery() {
	return (
		<div className="row d-flex justify-content-around">
			<h3 className="py-3 text-center my-1">What couples say</h3>
			<GalleryCard coupleName="Nate and Kate" image="/Nate and Kate.png" />
			<GalleryCard coupleName="John and Jane" image="John and Jane.png" />
			<GalleryCard coupleName="Mat and Merry" image="Mat and Merry.png" />
		</div>
	);
}

export default Gallery;
