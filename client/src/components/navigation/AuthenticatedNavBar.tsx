import React, { useContext, useState } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { useQuery } from "@apollo/client";
import { FETCH_ME_QUERY } from "../../util/graphql";
import Payments from "../../util/Payments";

export default function AuthenticatedNavBar() {
	const { logout } = useContext(AuthContext);

	const [activeItem, setActiveItem] = useState("home");

	const { data } = useQuery(FETCH_ME_QUERY);

	let credits = data?.me?.credits;

	const handleItemClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		{ name }: MenuItemProps
	) => setActiveItem(name!);

	return (
		<Menu pointing secondary size="massive" color="teal">
			<Menu.Item
				name="home"
				onClick={handleItemClick}
				active={activeItem === "home"}
				as={Link}
				to="/"
			/>
			<Menu.Item
				name="surveys"
				active={activeItem === "surveys"}
				onClick={handleItemClick}
				as={Link}
				to="/surveys"
			/>

			<Menu.Menu position="right">
				<Payments />
				<Menu.Item>{`Credits: ${credits}`}</Menu.Item>
				<Menu.Item name="logout" onClick={logout} />
			</Menu.Menu>
		</Menu>
	);
}
