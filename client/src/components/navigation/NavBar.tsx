import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import AuthenticatedNavBar from "./AuthenticatedNavBar";
import UnAuthenticatedNavBar from "./UnAuthenticatedNavBar";

export default function NavBar() {
	const { user } = useContext(AuthContext);

	const renderNavBar = user ? (
		<AuthenticatedNavBar />
	) : (
		<UnAuthenticatedNavBar />
	);

	return renderNavBar;
}
