import React, { useEffect, useState } from "react";
import Modal from "../Modal";

import { useMutation, useQuery } from "@apollo/client";
import SurveyListItem from "./SurveyListItem";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { SurveyInterface } from "./types";
import {
	FETCH_SURVEYSBYUSER_QUERY,
	DELETE_SURVEY_MUTATION,
} from "../../util/graphql";
//import { tw } from "../../TailwindClasses/Buttons";

const SurveyList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedSurvey, setSelectedSurvey] = useState("");
	const [sorting, setSorting] = useState("asc");
	const [filter, setFilter] = useState("sent-draft");

	const showModal = (id: string) => {
		setIsOpen(true);
		setSelectedSurvey(id);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	const { data } = useQuery(FETCH_SURVEYSBYUSER_QUERY);

	const { getSurveysByUser: surveys }: { getSurveysByUser: SurveyInterface[] } =
		data || [];

	const [deleteSurvey, {}] = useMutation(DELETE_SURVEY_MUTATION, {
		variables: {
			surveyId: selectedSurvey,
		},
	});

	useEffect(() => {}, []);

	const renderFilterSelection = () => {
		return (
			<div className="h-14 my-1.5">
				<select
					id="dropdown"
					className="h-14 flex min-w-full hover:shadow-inner border-solid border border-gray-200"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				>
					<option value="sent-draft">All surveys</option>
					<option value="sent">Sent surveys</option>
					<option value="draft">Draft surveys</option>
				</select>
			</div>
		);
	};
	const renderOrderByDateButton = () => {
		return (
			<div className="flex justify-center items-center h-14">
				<button
					className="bg-green-600 rounded p-4 text-white"
					onClick={() => {
						sorting === "asc" ? setSorting("desc") : setSorting("asc");
					}}
				>
					<span className="flex">
						<span className="pr-2">Order By Date</span>{" "}
						{sorting === "asc" ? <FaArrowUp /> : <FaArrowDown />}
					</span>
				</button>
			</div>
		);
	};

	const renderSurveys = () => {
		//Order By Date
		if (surveys) {
			console.log("surveys", surveys);
			const surveyArray = surveys;
			//TODO: FIX Sorting
			if (sorting === "desc") {
				surveyArray.slice().sort((a, b) => {
					return (
						new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
					);
				});
			} else {
				surveyArray.slice().sort((a, b) => {
					return (
						new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
					);
				});
			}

			return surveyArray
				.filter((survey) => filter.includes(survey.state))
				.map((survey) => {
					return (
						<SurveyListItem
							key={survey.id}
							id={survey.id}
							state={survey.state}
							title={survey.title}
							dateSent={survey.dateSent}
							createdAt={survey.createdAt}
							subject={survey.subject}
							body={survey.body}
							yes={survey.yes}
							no={survey.no}
							filter={filter}
							showModal={showModal}
						/>
					);
				});
		}
	};

	return (
		<main>
			{renderFilterSelection()}
			{renderOrderByDateButton()}
			<Modal
				open={isOpen}
				onClose={hideModal}
				handleConfirm={async () => {
					console.log(selectedSurvey);
					await deleteSurvey();
					window.location.assign("/surveys");
				}}
			>
				<h1>Delete Survey</h1>
				<p>Are you sure you want to delete this survey?</p>
			</Modal>
			{renderSurveys()}
		</main>
	);
};

export default SurveyList;
