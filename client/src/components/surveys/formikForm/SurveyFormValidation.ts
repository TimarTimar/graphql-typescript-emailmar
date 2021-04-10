import * as Yup from "yup";

export const SurveyFormSchema = Yup.object().shape({
	title: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	subject: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	body: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	recipients: Yup.array()
		.required("Required")
		.transform(function (value, originalValue) {
			if (this.isType(value) && value !== null) {
				return value;
			} else {
				return originalValue ? originalValue.split(/[\s,]+/) : [];
			}
		})
		.of(Yup.string().email(({ value }) => `${value} is not a valid email`)),
});
