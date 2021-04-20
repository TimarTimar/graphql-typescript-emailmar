import React, { useState, useContext } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import AuthenticatedNavBar from "./AuthenticatedNavBar";
import UnAuthenticatedNavBar from "./UnAuthenticatedNavBar";

export default function NavBar() {
	const { user, logout } = useContext(AuthContext);

	const renderNavBar = user ? (
		<AuthenticatedNavBar />
	) : (
		<UnAuthenticatedNavBar />
	);

	return renderNavBar;
}
