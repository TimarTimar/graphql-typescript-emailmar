import axios from "axios";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { tw } from "../../../TailwindClasses/Buttons";
import { FormikSurveyForm } from "./FormikSurveyForm";
import { saveAsDraft, sendSurvey } from "./surveyRoutes";
import { FetchSurveyResponseData, FormikSurveyFormValues } from "./types";

interface FormikSurveyListItemEditProps {}

interface FormikChildComponentProps {}

export const FormikSurveyListItemEdit: React.FC<FormikSurveyListItemEditProps> = ({}) => {
	const [formikFormValues, setFormikFormValues] = useState({
		title: "",
		subject: "",
		body: "",
		recipients: "",
	});
	const { surveyId }: { surveyId: string } = useParams();

	const [isLoading, setIsLoading] = useState(true);

	const { data } = useQuery(FETCH_SURVEY_QUERY, {
		variables: {
			surveyId,
		},
	});

	useEffect(() => {
		if (data) {
			const { getSurvey: survey } = data;
			console.log("data:", survey.recipients);

			const recipients = survey.recipients
				.map((item: any) => {
					return item.email;
				})
				.toLocaleString();
			const FormikInitialValues = {
				title: survey.title,
				subject: survey.subject,
				body: survey.body,
				recipients,
			};
			setFormikFormValues(FormikInitialValues);
			setIsLoading(false);
		}
	}, [data]);

	const FormikChildComponent = (props: FormikChildComponentProps) => {
		const formik = useFormikContext<FormikSurveyFormValues>();
		const [saveAsDraftSurvey, { error }] = useMutation(
			SAVE_AS_DRAFT_SURVEY_MUTUTATION,
			{
				variables: {
					surveyId,
					body: formik.values.body,
					title: formik.values.title,
					subject: formik.values.subject,
					recipients: formik.values.recipients,
				},
				onError(err) {
					return err;
				},
			}
		);
		const wrapSaveAsDraftSurvey = async () => {
			setIsLoading(true);
			await saveAsDraftSurvey();
			window.location.assign("/surveys");
		};
		return (
			<button
				className={tw.button.white}
				onClick={() => wrapSaveAsDraftSurvey()}
				type="submit"
			>
				Save As Draft
			</button>
		);
	};

	if (isLoading === false) {
		return (
			<FormikSurveyForm
				formTitle={"Edit Survey"}
				onCancel={(e: Event) => {
					e.preventDefault();
					e.stopPropagation();
					window.location.assign("/surveys");
				}}
				handleSubmit={(data: FormikSurveyFormValues) => {
					sendSurvey(data, setIsLoading, surveyId);
				}}
				initialValues={formikFormValues}
				showSaveAsDraftButton={true}
			>
				<FormikChildComponent />
			</FormikSurveyForm>
		);
	} else {
		return <div>Loading.....</div>;
	}
};

const FETCH_SURVEY_QUERY = gql`
	query getSurvey($surveyId: ID!) {
		getSurvey(surveyId: $surveyId) {
			id
			title
			subject
			body
			recipients {
				email
			}
		}
	}
`;

const SAVE_AS_DRAFT_SURVEY_MUTUTATION = gql`
	mutation editSurvey(
		$title: String!
		$subject: String!
		$body: String!
		$recipients: String!
		$surveyId: ID!
	) {
		editSurvey(
			surveyInput: {
				title: $title
				subject: $subject
				body: $body
				recipients: $recipients
			}
			surveyId: $surveyId
		) {
			id
			title
			subject
			body
		}
	}
`;
