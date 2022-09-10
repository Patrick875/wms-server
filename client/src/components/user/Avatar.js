import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { displayLogedInUserPanel } from "../../redux/actions/styesActions";

function Avatar(props) {
	let dispatch = useDispatch();
	const username = useSelector((state) => state.auth.user.names);
	const userProfile = useSelector((state) =>
		state.auth.user.profileImage && state.auth.user.profileImage.length !== 0
			? state.auth.user.profileImage[0]
			: null
	);
	const handleCloseUserPanel = () => {
		return function () {
			console.log("USER_PANEL_CLOSE");
			dispatch(displayLogedInUserPanel(false));
		};
	};
	return (
		<div className="mt-4">
			<div className="d-flex flex-row">
				<div className="d-flex flex-row justify-content-center col-10">
					{userProfile ? (
						<div className="avatar-holder mx-0 px-0">
							<img src={userProfile} alt={`${username} profile`} />
						</div>
					) : null}
				</div>

				<button
					style={{ zIndex: "100" }}
					className="ri-close-line ri-xl ms-4 col border-0 "
					onClick={handleCloseUserPanel()}></button>
			</div>
			<div className="text-center col-10">
				<p className="fw-bold text-capitalize">
					{username ? username : "Pete and Kate"}
				</p>
				<p className="text-muted">
					{props.weddingDate
						? `Wedding in ${props.weddingDate}`
						: "Wedding date unset"}
				</p>
			</div>
		</div>
	);
}

export default Avatar;
