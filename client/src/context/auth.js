import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState /*: { user: null | decodedTokenInterface } */ = {
	user: null,
};

/*interface decodedTokenInterface {
	id: string;
	email: string;
	username: string;
	iat: number;
	exp: number;
}*/

if (localStorage.getItem("jwtToken")) {
	const decodedToken /*:decodedTokenInterface*/ = jwtDecode(
		localStorage.getItem("jwtToken") /*!*/
	);
	console.log("decoded", decodedToken);
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem("jwtToken");
	} else {
		initialState.user = decodedToken;
	}
}

const AuthContext = createContext({
	user: null,
	login: (userData) => {},
	logout: () => {},
});

function authReducer(state, action) {
	switch (action.type) {
		default:
			return state;
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
	}
}

function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	console.log("state", state, "disp", dispatch);

	function login(userData) {
		localStorage.setItem("jwtToken", userData.token);
		dispatch({
			type: "LOGIN",
			payload: userData,
		});
	}

	function logout() {
		localStorage.removeItem("jwtToken");
		dispatch({
			type: "LOGOUT",
		});
		window.location.assign("/");
	}
	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
}

export { AuthContext, AuthProvider };
