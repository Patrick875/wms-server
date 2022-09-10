import React from "react";
import Card from "./Card";

const images = [
	"/dresses.png",
	"/catering.png",
	"/makeup.png",
	"/bridesmaids.png",
	"/sound.png",
	"/cameraman.png",
];

function CardGroup() {
	return (
		<div className="row d-flex  justify-content-around flex-wrap justify-content-sm-center ">
			<Card size="col-2" cardTitle="hospitality" cardImage="/laction.png" />
			<Card size="col-2" cardTitle="clothing" cardImage="/clothing.jpg" />
			<Card size="col-2" cardTitle="makeup" cardImage="/makeup.jpg" />
			<Card
				size="col-2"
				cardTitle="bridesGroomsmaids"
				cardImage="/bridemaids.jpg"
			/>
			<Card size="col-2" cardTitle="sound" cardImage="/DJ.jpg" />
			<Card size="col-2" cardTitle="camerawork" cardImage="/cameraman.jpg" />
		</div>
	);
}

export default CardGroup;
