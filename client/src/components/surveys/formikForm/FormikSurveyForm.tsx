import * as React from "react";
import { Formik, Form, Field } from "formik";
import { FormikSurveyFormValues, SurveyFormFieldsList } from "./types";
import { SurveyFormSchema } from "./SurveyFormValidation";
import { tw } from "../../../TailwindClasses/Buttons";
import { Button } from "semantic-ui-react";

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
					<Form className="ui form">
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
										value={values[item]}
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
							<Button color="red" onClick={props.onCancel} name="cancelButton">
								Cancel
							</Button>
							{props.showSaveAsDraftButton && props.children}
							<Button color="teal" type="submit" name="sendButton">
								Submit
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
