import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import Signup from "./Signup";

function AuthComponent() {
	const login = useSelector((state) => state.styles.login.displayLoginPanel);
	return <div>{login ? <Login /> : <Signup />}</div>;
}

export default AuthComponent;
