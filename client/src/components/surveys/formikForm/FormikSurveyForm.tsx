import * as React from "react";
import { Formik, Form, Field } from "formik";
import { FormikSurveyFormValues, SurveyFormFieldsList } from "./types";
import { SurveyFormSchema } from "./SurveyFormValidation";
import { tw } from "../../../TailwindClasses/Buttons";

interface FormikFormSurveyProps {
	handleSubmit: any;
	initialValues: FormikSurveyFormValues;
	onCancel: any;
	formTitle: string;
	showSaveAsDraftButton: boolean;
}

export const FormikSurveyForm: React.FC<FormikFormSurveyProps> = (props) => {
	return (
		<div>
			<h4 className={tw.h4}>{props.formTitle}</h4>
			<Formik
				enableReinitialize={true}
				initialValues={props.initialValues}
				onSubmit={props.handleSubmit}
				validationSchema={SurveyFormSchema}
			>
				{({ errors, touched, values }) => (
					<Form>
						{SurveyFormFieldsList.map((item) => {
							return (
								<div key={item} className="p-2">
									<Field
										id={item}
										name={item}
										className="w-full"
										placeholder={
											item === "recipients"
												? "Comma separated emails"
												: `Your email's ${item}`
										}
									/>
									<span>
										{errors[item] && touched[item] ? (
											<div className="text-red-400">{errors[item]}</div>
										) : null}
									</span>
								</div>
							);
						})}
						<div className="flex justify-between items-center h-14 my-2.5">
							<button
								className={tw.button.white}
								onClick={props.onCancel}
								name="cancelButton"
							>
								Cancel
							</button>
							{props.showSaveAsDraftButton && props.children}
							<button
								className={tw.button.white}
								type="submit"
								name="sendButton"
							>
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
