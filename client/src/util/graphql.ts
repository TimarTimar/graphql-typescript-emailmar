import { gql } from "@apollo/client";

//User Queries

export const FETCH_ME_QUERY = gql`
	query {
		me {
			credits
		}
	}
`;

// User Mutations

export const LOGIN_USER = gql`
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

export const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
			credits
		}
	}
`;

//Payment Mutations
export const PAY_5_USD_MUTATION = gql`
	mutation pay5usd($token: String!) {
		pay5usd(token: $token) {
			id
			credits
		}
	}
`;

/*
//Post Queries
export const FETCH_POSTS_QUERY = gql`
	{
		getPosts {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

//Post Mutations

export const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			likeCount
			comments {
				id
				body
				username
				createdAt
			}
			commentCount
		}
	}
`;

export const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

export const FETCH_POST_QUERY = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

//Comment Mutations

export const SUBMIT_COMMENT_MUTATION = gql`
	mutation($postId: ID!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				body
				createdAt
				username
			}
			commentCount
		}
	}
`;

export const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				username
				body
				createdAt
			}
			commentCount
		}
	}
`;

//Like Mutations
//It's updating the returning post
export const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;
*/

//Survey Queries

export const FETCH_SURVEY_QUERY = gql`
	query getSurvey($surveyId: ID!) {
		getSurvey(surveyId: $surveyId) {
			id
			title
			subject
			body
			recipients {
				email
			}
		}
	}
`;

export const FETCH_SURVEYSBYUSER_QUERY = gql`
	query getSurveysByUser {
		getSurveysByUser {
			id
			title
			subject
			body
			state
			yes
			no
			dateSent
			createdAt
		}
	}
`;

// Survey Muations

export const CREATE_SURVEY_MUTATUION = gql`
	mutation createSurvey(
		$title: String!
		$subject: String!
		$body: String!
		$recipients: String!
	) {
		createSurvey(
			surveyInput: {
				title: $title
				subject: $subject
				body: $body
				recipients: $recipients
			}
		) {
			id
			title
			subject
			body
			createdAt
			yes
			no
		}
	}
`;

export const SAVE_AS_DRAFT_SURVEY_MUTUTATION = gql`
	mutation editSurvey(
		$title: String!
		$subject: String!
		$body: String!
		$recipients: String!
		$surveyId: ID!
	) {
		editSurvey(
			surveyInput: {
				title: $title
				subject: $subject
				body: $body
				recipients: $recipients
			}
			surveyId: $surveyId
		) {
			id
			title
			subject
			body
		}
	}
`;

export const DELETE_SURVEY_MUTATION = gql`
	mutation deleteSurvey($surveyId: ID!) {
		deleteSurvey(surveyId: $surveyId)
	}
`;

export const QUICK_SEND_SURVEY_MUTATION = gql`
	mutation quickSendSurvey($surveyId: ID!) {
		quickSendSurvey(surveyId: $surveyId) {
			id
			subject
			body
			title
			createdAt
			state
			dateSent
			yes
			no
		}
	}
`;

export const CREATE_SURVEY_AND_SEND_MUTATUION = gql`
	mutation createSurveyAndSend(
		$title: String!
		$subject: String!
		$body: String!
		$recipients: String!
	) {
		createSurveyAndSend(
			surveyInput: {
				title: $title
				subject: $subject
				body: $body
				recipients: $recipients
			}
		) {
			id
		}
	}
`;

export const EDIT_SURVEY_AND_SEND_MUTATION = gql`
	mutation editSurveyAndSend(
		$title: String!
		$subject: String!
		$body: String!
		$recipients: String!
		$surveyId: ID!
	) {
		editSurveyAndSend(
			surveyInput: {
				title: $title
				subject: $subject
				body: $body
				recipients: $recipients
			}
			surveyId: $surveyId
		) {
			id
			title
			subject
			body
			state
			dateSent
			createdAt
		}
	}
`;
