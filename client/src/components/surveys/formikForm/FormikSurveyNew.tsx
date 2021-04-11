// SurveyNew shows SurveyForm and SurveyReview, you can jump back and force review and edit formvalues
import axios from "axios";
import { useFormikContext } from "formik";
import React, { useState } from "react";
import { tw } from "../../../TailwindClasses/Buttons";
import { FormikSurveyForm } from "./FormikSurveyForm";
import { FormikSurveyFormValues, SurveyFormFieldsList } from "./types";

const FormikButtons = () => {
	const formik = useFormikContext();

	const saveAsDraft = async (formValues: FormikSurveyFormValues | unknown) => {
		await axios.post("/api/save_as_draft", formValues);
		window.location.assign("/surveys");
	};

	/*React.useEffect(() => {
		console.group("Formik State");
		console.log("values", formik.values);
		console.log("errors", formik.errors);
		console.log("touched", formik.touched);
		console.log("isSubmitting", formik.isSubmitting);
		console.log("isValidating", formik.isValidating);
		console.log("submitCount", formik.submitCount);
		console.groupEnd();
	}, [
		formik.values,
		formik.errors,
		formik.touched,
		formik.isSubmitting,
		formik.isValidating,
		formik.submitCount,
	]);*/
	return (
		<button
			className={tw.button.white}
			onClick={() => saveAsDraft(formik.values)}
			type="button"
		>
			Save As Draft
		</button>
	);
};

export const FormikSurveyNew = () => {
	const [showFormReview, setShowFormReview] = useState(false);
	const [formikFormValues, setFormikFormValues] = useState({
		title: "",
		subject: "",
		body: "",
		recipients: "",
	});

	const sendSurvey = async (values: FormikSurveyFormValues) => {
		await axios.post("/api/surveys", values);
		window.location.assign("/surveys");
	};

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
						<button>Save as draft</button>
						<button
							className={tw.button.white}
							onClick={() => {
								console.log(formikFormValues);
								sendSurvey(formikFormValues);
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
				>
					<FormikButtons />
				</FormikSurveyForm>
			);
		}
	};

	return <div>{renderContent()}</div>;
};
