import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

//Custom hook
import { useForm } from "../util/hooks";
import { REGISTER_USER } from "../util/graphql";

export default function Register(props) {
	const context = useContext(AudioContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(registerUserCallback, {
		username: "",
		password: "",
		email: "",
		confirmPassword: "",
	});

	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			context.login(userData);
			props.history.push("/");
		},
		onError(err) {
			setErrors(
				err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.errors : {}
			);
		},
		variables: {
			username: values.username,
			email: values.email,
			password: values.password,
			confirmPassword: values.confirmPassword,
		},
	});

	function registerUserCallback() {
		registerUser();
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Register</h1>
				<Form.Input
					label="Username"
					placeholder="Username.."
					name="username"
					value={values.username}
					onChange={onChange}
					error={errors?.username ? true : false}
				/>
				<Form.Input
					label="Email"
					placeholder="Email.."
					type="email"
					name="email"
					value={values.email}
					onChange={onChange}
					error={errors?.email ? true : false}
				/>
				<Form.Input
					label="Password"
					placeholder="Password.."
					type="password"
					name="password"
					value={values.password}
					onChange={onChange}
					error={errors?.password ? true : false}
				/>

				<Form.Input
					label="Confirm Password"
					type="password"
					placeholder="Confirm Password.."
					name="confirmPassword"
					value={values.confirmPassword}
					onChange={onChange}
					error={errors?.confirmPassword ? true : false}
				/>
				<Button type="submit" primary>
					Register
				</Button>
			</Form>
			{Object.keys(errors).length !== 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => {
							console.log("uh,?", errors);
							return <li key={value}>{value}</li>;
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
