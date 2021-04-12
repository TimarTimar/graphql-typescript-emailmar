import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import { FormikSurveyNew } from "./components/surveys/formikForm/FormikSurveyNew";
import { FormikSurveyListItemEdit } from "./components/surveys/formikForm/FormikSurveyListItemEdit";
import { FormikSurveyForm } from "./components/surveys/formikForm/FormikSurveyForm";
import SurveysDashboard from "./components/SurveysDashboard";
import Posts from "./pages/Posts";
import Header from "./components/Header";

function App() {
	return (
		<AuthProvider>
			<div className="ui container">
				<Router>
					<Header />
					<Route exact path="/" component={Posts} />
					<Route exact path="/posts" component={Posts} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
					<Route exact path="/post/:postId" component={SinglePost} />
					<Route path="/surveys" exact component={SurveysDashboard} />
					<Route path="/surveys/new" component={FormikSurveyNew} />
					<Route
						path="/edit_survey/:surveyId"
						component={FormikSurveyListItemEdit}
					/>
					<Route path="/surveys/formik" component={FormikSurveyForm} />
				</Router>
			</div>
		</AuthProvider>
	);
}

export default App;
