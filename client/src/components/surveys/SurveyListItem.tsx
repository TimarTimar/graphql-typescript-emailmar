import React from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { SurveyInterface } from "./types";
import { tw } from "../../TailwindClasses/Buttons";
import { FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";

export interface SurveyWithModalAndFilter extends SurveyInterface {
	showModal: (id: string) => void;
	filter: string;
}

const SurveyListItem = ({
	id,
	state,
	title,
	body,
	dateSent,
	createdAt,
	yes,
	no,
	showModal,
}: SurveyWithModalAndFilter) => {
	const [quickSendSurvey, { data }] = useMutation(QUICK_SEND_SURVEY_MUTATION, {
		variables: {
			surveyId: id,
		},
	});
	const conditionalDraftRendering = (_id: string, state: "sent" | "draft") => {
		return {
			renderSendButton:
				state === "draft" ? (
					<button
						className={tw.button.white.toString().concat(" p-2 mx-1.5")}
						onClick={() => quickSendSurvey()}
					>
						Quick Send
					</button>
				) : null,
			renderEditButton:
				state === "draft" ? (
					<Link
						to={`/edit_survey/${_id}`}
						className={tw.button.white.toString().concat(" p-2")}
					>
						Edit
					</Link>
				) : null,
			cardBgColor: state === "draft" ? "bg-blue-300" : "bg-green-600",
			stateIcon:
				state === "draft" ? (
					<FaEnvelopeOpen className="text-5xl" />
				) : (
					<FaEnvelope className="text-5xl" />
				),
		};
	};

	return (
		<div className="rounded-md p-2">
			<div
				className={`${conditionalDraftRendering(id, state).cardBgColor.concat(
					" flex justify-between relative rounded p-2 mt-1.5 border-gray-200 border-2 transition-shadow text-white"
				)}`}
			>
				<div className="h-32 max-w-4xl">
					<span className="text-xl underline">{title}</span>
					<p>{body}</p>
					<p>
						Created At:{" "}
						{createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
					</p>
					<h5>
						Yes: {yes} No: {no}
					</h5>
				</div>
				<div>{conditionalDraftRendering(id, state).stateIcon}</div>
			</div>
			<div className="flex justify-end items-center h-12 mb-2.5 pr-4 border-gray-400 bg-gray-100">
				{conditionalDraftRendering(id, state).renderEditButton}
				{conditionalDraftRendering(id, state).renderSendButton}
				<button
					className={tw.button.white.toString().concat(" p-2")}
					onClick={() => showModal(id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default SurveyListItem;

const QUICK_SEND_SURVEY_MUTATION = gql`
	mutation quickSendSurvey($surveyId: ID!) {
		quickSendSurvey(surveyId: $surveyId) {
			id
			subject
			body
			title
			createdAt
			state
			dateSent
			yes
			no
		}
	}
`;
