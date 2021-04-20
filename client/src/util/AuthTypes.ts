export interface RegistrationAndLoginInterface {
	username: string;
	email?: string;
	password: string;
	confirmPassword?: string;
}

export interface LoginInterface {
	username: string;
	password: string;
}
