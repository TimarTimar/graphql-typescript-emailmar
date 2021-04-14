//check if we logged in, and if we are we cant access to /login and /register /surveys pages

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

function AuthRoute({ component: Component, ...rest }: any) {
	const { user } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
}

export default AuthRoute;
