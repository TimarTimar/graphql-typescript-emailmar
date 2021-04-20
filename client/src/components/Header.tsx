import React, { useContext, useEffect } from "react";
//import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useQuery } from "@apollo/client";
import Payments from "../util/Payments";
import { FETCH_ME_QUERY } from "../util/graphql";
//import { RootState } from "../reducers";

const Header = () => {
	//const auth = useSelector((state: RootState) => state.auth);
	const { user, logout } = useContext<any>(AuthContext);
	const { data } = useQuery(FETCH_ME_QUERY);

	let credits = data?.me?.credits;

	useEffect(() => {}, [credits]);

	const renderContent = () => {
		if (!user) {
			return (
				<>
					<li key="/login" className="pr-4 hover:text-green-200">
						<Link to="/login">Login</Link>
					</li>
					<li key="/register" className="pr-4 hover:text-green-200">
						<Link to="/register">Register</Link>
					</li>
				</>
			);
		} else if (user) {
			return (
				<>
					<li key="/surveys" className="pr-4">
						<Link className="hover:text-green-200" to="/surveys">
							Surveys
						</Link>
					</li>
					<li key="1" className="pr-4 hover:text-green-200">
						<Payments />
					</li>
					<li key="3" className="pr-4 hover:text-green-200">
						Credits: {credits}
					</li>
					<li key="2" className="pr-4">
						<button className="hover:text-green-200" onClick={logout}>
							Logout
						</button>
					</li>
				</>
			);
		}
	};
	return (
		<div>
			<nav className="flex justify-between mx-auto bg-blue-300 border-gray-400 hover:shadow-inner text-white h-10 pt-2 my-0.5 rounded-md pl-4 pr-4 ">
				<div>
					<Link
						className="text-lg hover:text-green-200"
						to={user ? "/surveys" : "/"}
					>
						Emailmar
					</Link>
				</div>
				<ul className="flex">{renderContent()}</ul>
			</nav>
		</div>
	);
};

export default Header;
