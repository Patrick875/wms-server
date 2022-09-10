import React from "react";
import { Link } from "react-router-dom";

function Card({ cardImage, cardTitle, size }) {
	return (
		<div
			className={`${size} bg-light shadow mb-5 bg-white rounded col-10 col-md-6 col-lg-3 col-xl-2`}>
			<div className="card-body ">
				<div className="card-title font-weight-bold">{cardTitle}</div>
				<img src="" alt="" src={cardImage} className="card-image w-100" />
				<div className="py-2 mt-2 ">
					<Link
						className="card-link nav-link text-white font-weight-bold btn btn-danger"
						to={`/${cardTitle}`}>
						Order now
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Card;
