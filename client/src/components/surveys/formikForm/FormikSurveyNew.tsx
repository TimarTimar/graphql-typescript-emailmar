// SurveyNew shows SurveyForm and SurveyReview, you can jump back and force review and edit formvalues
import React, { useState } from "react";
import { tw } from "../../../TailwindClasses/Buttons";
import { FormikSurveyForm } from "./FormikSurveyForm";
import { FormikSurveyFormValues, SurveyFormFieldsList } from "./types";
import { useMutation } from "@apollo/client";
import {
	CREATE_SURVEY_AND_SEND_MUTATUION,
	CREATE_SURVEY_MUTATUION,
} from "../../../util/graphql";

export const FormikSurveyNew = () => {
	const [showFormReview, setShowFormReview] = useState(false);
	const [formikFormValues, setFormikFormValues] = useState({
		title: "",
		subject: "",
		body: "",
		recipients: "",
	});

	const [createSurveyAsDraft] = useMutation(CREATE_SURVEY_MUTATUION, {
		variables: formikFormValues,
	});

	const [createSurveyAndSend, {}] = useMutation(
		CREATE_SURVEY_AND_SEND_MUTATUION,
		{
			variables: formikFormValues,
		}
	);

	const renderContent = () => {
		if (showFormReview) {
			return (
				<div>
					<h4 className={tw.h4}>Review</h4>
					<div>
						{SurveyFormFieldsList.map((item) => {
							return (
								<div key={item} className="p-2 text-gray-500">
									<label>{`Email's ${item}: `}</label>
									<div>{formikFormValues[item]}</div>
									<hr />
								</div>
							);
						})}
					</div>
					<div className="flex justify-between my-3.5">
						<button
							className={tw.button.white}
							onClick={() => setShowFormReview(false)}
						>
							Cancel
						</button>
						<button
							onClick={async (e) => {
								e.preventDefault();
								await createSurveyAsDraft();
								window.location.assign("/surveys");
							}}
						>
							SAVEASDRAFT
						</button>
						<button
							className={tw.button.white}
							onClick={async (e) => {
								e.preventDefault();
								e.stopPropagation();
								await createSurveyAndSend();
								window.location.assign("/surveys");
							}}
						>
							Send
						</button>
					</div>
				</div>
			);
		} else {
			return (
				<FormikSurveyForm
					formTitle={"Create Survey"}
					onCancel={(e: Event) => {
						e.preventDefault();
						e.stopPropagation();
						window.location.assign("/surveys");
					}}
					handleSubmit={(data: FormikSurveyFormValues) => {
						setShowFormReview(true);
						setFormikFormValues(data);
					}}
					initialValues={formikFormValues}
					showSaveAsDraftButton={false}
				></FormikSurveyForm>
			);
		}
	};

	return <div>{renderContent()}</div>;
};
