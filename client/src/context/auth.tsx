import React, { createContext, Reducer, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState: { user: null | decodedTokenInterface } = {
	user: null,
};

//user interface that login and register gives back

export interface userDataInterface {
	id: string;
	email: string;
	username: string;
	createdAt: string;
	token: string;
	credits: number;
}

//user interface what jwt decode gives back
export interface decodedTokenInterface {
	id: string;
	email: string;
	username: string;
	iat: number;
	exp: number;
}

if (localStorage.getItem("jwtToken")) {
	const decodedToken: decodedTokenInterface = jwtDecode(
		localStorage.getItem("jwtToken")!
	);
	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem("jwtToken");
	} else {
		initialState.user = decodedToken;
	}
}

const AuthContext: React.Context<{
	user: any;
	login: (userData: userDataInterface) => void;
	logout: () => void;
}> = createContext({
	user: null,
	login: (userData: userDataInterface) => {},
	logout: () => {},
});

function authReducer(
	state: { user: decodedTokenInterface },
	action: { type: string; payload?: userDataInterface }
) {
	switch (action.type) {
		default:
			return state;
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
	}
}

const AuthProvider: React.FunctionComponent = (props) => {
	const [state, dispatch] = useReducer<Reducer<any, any>>(
		authReducer,
		initialState
	);
	console.log("state", state, "disp", dispatch);

	function login(userData: userDataInterface) {
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
};

export { AuthContext, AuthProvider };
