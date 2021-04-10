import axios from "axios";
import { FormikSurveyFormValues } from "./types";

// edit and sand survey (byId)
export const sendSurvey = async (
	values: FormikSurveyFormValues,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
	surveyId: string
) => {
	setIsLoading(true);
	await axios.patch(`/api/send_survey/${surveyId}`, values);
	window.location.assign("/surveys");
};

//Edit and save as draft (byId)
export const saveAsDraft = async (
	values: any,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
	surveyId: string
) => {
	setIsLoading(true);
	await axios.patch(`/api/edit_survey/${surveyId}`, values);
	window.location.assign("/surveys");
};

//DeleteSurvey (byId)

//Create And Save as Draft

//Create and Send (And Save)

//QuickSend from ListView (And Save)
