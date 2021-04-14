import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "../pages/SurveyList";
import { FaPlus } from "react-icons/fa";

const SurveysDashboard = () => {
	return (
		<div>
			<SurveyList />
			<div className="fixed bottom-4 right-4">
				<Link
					to="/surveys/new"
					className="rounded-full bg-green-600 flex items-center justify-center p-6 hover:bg-green-400"
				>
					<FaPlus className="text-gray-100" />
				</Link>
			</div>
		</div>
	);
};

export default SurveysDashboard;
