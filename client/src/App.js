import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import { Container } from "semantic-ui-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

function App() {
	return (
		<AuthProvider>
			<div className="ui container">
				<Router>
					<NavBar />
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
				</Router>
			</div>
		</AuthProvider>
	);
}

export default App;
