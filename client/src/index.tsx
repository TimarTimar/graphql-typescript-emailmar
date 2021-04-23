import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import App from "./App";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_SERVER_URL,
});

const authLink = setContext(() => {
	const token = localStorage.getItem("jwtToken");
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
