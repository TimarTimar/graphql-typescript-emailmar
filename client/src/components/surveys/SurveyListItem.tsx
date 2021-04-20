import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SurveyInterface } from "./types";
import { QUICK_SEND_SURVEY_MUTATION } from "../../util/graphql";
import { Button } from "semantic-ui-react";

export interface SurveyWithModalAndFilter extends SurveyInterface {
	showModal: (id: string) => void;
}

const SurveyListItem = ({
	id,
	state,
	title,
	body,
	createdAt,
	yes,
	no,
	showModal,
}: SurveyWithModalAndFilter) => {
	const [quickSendSurvey] = useMutation(QUICK_SEND_SURVEY_MUTATION, {
		variables: {
			surveyId: id,
		},
	});
	const conditionalDraftRendering = (_id: string, state: "sent" | "draft") => {
		return {
			renderSendButton:
				state === "draft" ? (
					<Button
						className="right floated"
						color="teal"
						onClick={() => quickSendSurvey()}
					>
						Quick Send
					</Button>
				) : null,
			renderEditButton:
				state === "draft" ? (
					<Link
						to={`/edit_survey/${_id}`}
						className="ui button teal right floated"
					>
						Edit
					</Link>
				) : null,
			cardBgColor: state === "draft" ? "orange" : "purple",
			stateIcon:
				state === "draft" ? (
					<i className="right floated envelope open outline icon" />
				) : (
					<i className="right floated envelope outline icon" />
				),
		};
	};

	return (
		<div
			className="ui card"
			style={{
				width: "100%",
				backgroundColor: conditionalDraftRendering(id, state).cardBgColor,
				color: "whitesmoke",
			}}
		>
			<div className="ui content">
				<div
					className="ui header"
					style={{ padding: 20, color: "whitesmoke", fontSize: 26 }}
				>
					{title}

					{conditionalDraftRendering(id, state).stateIcon}
				</div>
				<div style={{ padding: 20, fontSize: 18 }}>
					<p>{body}</p>
					<p>
						Created At:{" "}
						{createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
					</p>
				</div>
			</div>
			<div className="ui extra content" style={{ color: "whitesmoke" }}>
				<span style={{ fontSize: 20, marginLeft: 20 }}>
					Yes: {yes} No: {no}
				</span>
				<Button
					className="right floated"
					color="red"
					onClick={() => showModal(id)}
				>
					Delete
				</Button>
				{conditionalDraftRendering(id, state).renderSendButton}
				{conditionalDraftRendering(id, state).renderEditButton}
			</div>
		</div>
	);
};

export default SurveyListItem;
