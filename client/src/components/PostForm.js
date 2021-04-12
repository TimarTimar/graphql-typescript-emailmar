import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../util/hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../util/graphql";

export default function PostForm() {
	const { values, onChange, onSubmit } = useForm(createPostCallback, {
		body: "",
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			//data.getPosts = [result.data.createPost, ...data.getPosts];
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: { getPosts: [result.data.createPost, ...data.getPosts] },
			});
			values.body = "";
		},
		onError(err) {
			return err;
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Create Post: </h2>
				<Form.Field>
					<Form.Input
						placeholder="Welcome, let's go"
						name="body"
						onChange={onChange}
						value={values.body}
						error={error ? true : false}
					/>
					<Button type="submit" color="teal">
						Submit
					</Button>
				</Form.Field>
			</Form>
			{error && (
				<div className="ui error message" style={{ marginBottom: 20 }}>
					<ul className="list">
						<li>{error.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</>
	);
}
