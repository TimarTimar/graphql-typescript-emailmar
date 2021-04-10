export interface FormikSurveyFormValues {
	title: string;
	subject: string;
	body: string;
	recipients: string;
}

export interface FetchSurveyResponseData {
	data: {
		body: string;
		dateSent: string;
		no: number;
		recipients: { responded: boolean; _id: string; email: string }[];
		state: "draft" | "sent";
		subject: string;
		createdAt: string;
		title: string;
		yes: number;
		_id: string;
		_user: string;
	};
}

export interface FetchSurveyResponseDataGRAPHQL {
	getSurvey: {
		body: string;
		dateSent?: string;
		no?: number;
		recipients?: { responded?: boolean; id?: string; email?: string }[];
		state?: "draft" | "sent";
		subject: string;
		createdAt?: string;
		title: string;
		yes?: number;
		id: string;
		_user?: string;
	};
}

export const SurveyFormFieldsList = [
	"title",
	"subject",
	"body",
	"recipients",
] as const;
