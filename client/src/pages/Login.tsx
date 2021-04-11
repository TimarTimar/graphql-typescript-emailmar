import React, { useState, useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

//Custom hook
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { Interface } from "node:readline";

export default function Login(props: any) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState<UserInputInterface>({
		password: "",
		username: "",
	});

	const { onChange, onSubmit, values }: any = useForm(loginUserCallback, {
		username: "",
		password: "",
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			context.login(userData);
			props.history.push("/");
		},
		onError(err: any) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		variables: {
			username: values.username,
			email: values.email,
			password: values.password,
			confirmPassword: values.confirmPassword,
		},
		errorPolicy: "none",
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
				<h1>Login</h1>
				<Form.Input
					label="Username"
					placeholder="Username.."
					name="username"
					value={values.username}
					onChange={onChange}
					error={errors.username ? true : false}
				/>
				<Form.Input
					label="Password"
					placeholder="Password.."
					type="password"
					name="password"
					value={values.password}
					onChange={onChange}
					error={errors.password ? true : false}
				/>
				<Button type="submit" primary>
					Login
				</Button>
			</Form>
			{/*Object.keys(errors).length !== 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => {
							if (value !== "") {
								console.log("uh,?", errors);
								return <li key={value}>{value}</li>;
							} else {
								return null;
							}
						})}
					</ul>
				</div>
					)*/}
			{(errors.username || errors.password) && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => {
							if (value !== "") {
								console.log("uh,?", errors);
								return <li key={value}>{value}</li>;
							} else {
								return null;
							}
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
export interface UserInterface {
	id: string;
	email: string;
	username: string;
	createdAt: string;
	token: string;
	credits: number;
}

export interface UserInputInterface {
	username: string;
	password: string;
	confirmPassword?: string;
	email?: string;
}

const LOGIN_USER = gql`
	mutation register($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
			credits
		}
	}
`;
