//List of all the surveys. User can create delete edit and send surveys from here.

import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";

import { useMutation, useQuery } from "@apollo/client";
import SurveyListItem from "../components/surveys/SurveyListItem";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { SurveyInterface } from "../components/surveys/types";
import {
	FETCH_SURVEYSBYUSER_QUERY,
	DELETE_SURVEY_MUTATION,
} from "../util/graphql";
import { Button, Container, Divider, Dropdown } from "semantic-ui-react";

//import { tw } from "../../TailwindClasses/Buttons";

const SurveyList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedSurvey, setSelectedSurvey] = useState("");
	const [sorting, setSorting] = useState("asc");
	const [values, setValues] = useState<any>("sent-draft");

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

	const [deleteSurvey] = useMutation(DELETE_SURVEY_MUTATION, {
		variables: {
			surveyId: selectedSurvey,
		},
	});

	useEffect(() => {}, []);

	const renderFilterSelection3 = () => {
		const tagOptions = [
			{
				key: "draft-sent",
				text: "All",
				value: "draft-sent",
				label: { color: "teal", empty: true, circular: true },
			},
			{
				key: "draft",
				text: "Draft",
				value: "draft",
				label: { color: "orange", empty: true, circular: true },
			},
			{
				key: "sent",
				text: "Sent",
				value: "sent",
				label: { color: "purple", empty: true, circular: true },
			},
		];
		return (
			<Dropdown
				text="Filter Surveys"
				icon="filter"
				floating
				labeled
				button
				className="icon"
			>
				<Dropdown.Menu>
					<Dropdown.Menu scrolling>
						{tagOptions.map((option) => (
							<Dropdown.Item
								onClick={(e, r) => setValues(r.value)}
								{...option}
							/>
						))}
					</Dropdown.Menu>
				</Dropdown.Menu>
			</Dropdown>
		);
	};
	const renderOrderByDateButton = () => {
		return (
			<div className="flex justify-center items-center h-14">
				<Button
					className="huge"
					color="teal"
					onClick={() => {
						sorting === "asc" ? setSorting("desc") : setSorting("asc");
					}}
				>
					<span className="flex">
						<span className="pr-2">Order By Date</span>{" "}
						{sorting === "asc" ? <FaArrowUp /> : <FaArrowDown />}
					</span>
				</Button>
			</div>
		);
	};

	const renderSurveys = () => {
		//Order By Date
		if (surveys) {
			const surveyArray = surveys.slice();
			if (sorting === "desc") {
				surveyArray.sort((a, b) => {
					return (
						new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
					);
				});
			} else {
				surveyArray.sort((a, b) => {
					return (
						new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
					);
				});
			}

			return surveyArray
				.filter((survey) => values.includes(survey.state))
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
							showModal={showModal}
						/>
					);
				});
		}
	};

	return (
		<main>
			<Container>
				<div className="flex justify-center flex-col p-2">
					{renderFilterSelection3()}
					<Divider />
					{renderOrderByDateButton()}
				</div>
			</Container>
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
