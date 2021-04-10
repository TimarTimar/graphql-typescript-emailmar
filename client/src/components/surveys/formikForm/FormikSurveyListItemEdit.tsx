import axios from "axios";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { tw } from "../../../TailwindClasses/Buttons";
import { FormikSurveyForm } from "./FormikSurveyForm";
import { sendSurvey } from "./surveyRoutes";
import { FetchSurveyResponseData, FormikSurveyFormValues } from "./types";

interface FormikSurveyListItemEditProps {}

interface FormikChildComponentProps {
	saveAsDraft: (values: FormikSurveyFormValues) => void;
}

//For getting the props
const FormikChildComponent = (props: FormikChildComponentProps) => {
	const formik = useFormikContext<FormikSurveyFormValues>();
	return (
		<button
			className={tw.button.white}
			onClick={() => props.saveAsDraft(formik.values)}
			type="button"
		>
			Save As Draft
		</button>
	);
};

export const FormikSurveyListItemEdit: React.FC<FormikSurveyListItemEditProps> = (
	props: any
) => {
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

	/*useEffect(() => {
		const main = async () => {
			const { data }: FetchSurveyResponseData = await axios.get(
				`/api/fetch_survey/${surveyId}`
			);
			const recipients = data.recipients
				.map((item) => {
					return item.email;
				})
				.toLocaleString();
			const FormikInitialValues = {
				title: data.title,
				subject: data.subject,
				body: data.body,
				recipients,
			};
			setFormikFormValues(FormikInitialValues);
			setIsLoading(false);
		};
		main();
	}, []);

	const [formikFormValues, setFormikFormValues] = useState({
		title: "",
		subject: "",
		body: "",
		recipients: "",
	});
	*/

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
			>
				<FormikChildComponent
					saveAsDraft={async (values) => {
						setIsLoading(true);
						await axios.patch(`/api/edit_survey/${surveyId}`, values);
						window.location.assign("/surveys");
					}}
				/>
			</FormikSurveyForm>
		);
	} else {
		return (
			<div className="progress">
				<div className="indeterminate"></div>
			</div>
		);
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
