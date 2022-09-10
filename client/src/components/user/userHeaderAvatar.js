import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { displayLogedInUserPanel } from "../../redux/actions/styesActions";

function UserHeaderAvatar(props) {
	const dispatch = useDispatch();
	let display = useSelector((state) => state.styles.userPanel.display);
	const username = useSelector((state) => state.auth.user.names);
	const role = useSelector((state) =>
		state.auth.user ? state.auth.user.role : null
	);
	const userProfile = useSelector((state) =>
		state.auth.user.profileImage.length !== 0
			? state.auth.user.profileImage[0]
			: null
	);
	const history = useLocation();
	const handleOpenUserPanel = () => {
		if (role && role !== "admin") {
			dispatch(displayLogedInUserPanel(true));
		}
	};
	return (
		<div
			className="col  "
			style={{
				visibility: `${display ? "hidden" : "visible"}`,
			}}>
			{userProfile ? (
				<div className="d-flex flex-row col-4  px-1">
					<div className="avatar-holder-header mx-0 px-0">
						<img src={userProfile} alt="okay" />
					</div>
				</div>
			) : null}

			<div className="col px-0" onClick={() => handleOpenUserPanel()}>
				<p
					className="my-2 text-start"
					onClick={() => handleOpenUserPanel()}
					role="button">
					<strong>{username}</strong>
				</p>
			</div>
		</div>
	);
}

export default UserHeaderAvatar;
