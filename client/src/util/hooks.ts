import React, { FormEvent, useState } from "react";

import { RegistrationAndLoginInterface } from "./AuthTypes";

export const useForm = (
	callback: () => any,
	initialState: RegistrationAndLoginInterface
) => {
	const [values, setValues] = useState(initialState);
	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};
