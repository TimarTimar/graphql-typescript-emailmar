export interface SurveyInterface {
	yes: number;
	no: 0;
	state: "draft" | "sent";
	dateSent?: any;
	createdAt?: any;
	id: string;
	title: string;
	subject: string;
	participiants?: string;
	body: string;
	_user?: string;
	lastResponded?: any;
}
