import React from "react";
import { useSelector } from "react-redux";

function LogeInMenuLayout(props) {
	let display = useSelector((state) => state.styles.userPanel.display);

	return (
		<div
			className="login"
			style={{
				display: `${display} `,
				visibility: `${display ? "visible" : "hidden"}`,
			}}>
			<div className="mx-3">{props.children}</div>
		</div>
	);
}

export default LogeInMenuLayout;
