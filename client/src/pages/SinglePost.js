import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import InvertedPopup from "../util/InvertedPopup";
import {
	Button,
	Card,
	Form,
	Grid,
	Icon,
	Image,
	Label,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from "../util/graphql";

export default function SinglePost(props) {
	const { user } = useContext(AuthContext);
	const commentInputRef = useRef(null);
	const [comment, setComment] = useState("");
	const postId = props.match.params.postId;

	function deletePostCallback() {
		props.history.push("/");
	}

	const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update() {
			setComment("");
			commentInputRef.current.blur();
		},
		variables: {
			postId,
			body: comment,
		},
	});

	const { data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});
	let postMarkup;
	if (!data?.getPost) {
		postMarkup = <p>Loading...</p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likeCount,
			commentCount,
		} = data.getPost;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							src="https://react.semantic-ui.com/images/avatar/large/molly.png"
							size="small"
							floated="right"
						></Image>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likeCount, likes }} />
								<InvertedPopup content="Comment on post">
									<Button
										as="div"
										labelPosition="right"
										onClick={() => console.log("Comment on Post")}
									>
										<Button basic color="blue">
											<Icon name="comments" />
										</Button>
										<Label basic color="blue" positioning="left">
											{commentCount}
										</Label>
									</Button>
								</InvertedPopup>
								{user && user.username === username && (
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<p>Post a comment</p>
									<Form>
										<div className="ui action input fluid">
											<input
												type="text"
												placeholder="comment.."
												name="comment"
												value={comment}
												onChange={(e) => setComment(e.target.value)}
												ref={commentInputRef}
											></input>
											<Button
												type="submit"
												className="ui-button"
												color="teal"
												disabled={comment.trim() === ""}
												onClick={submitComment}
											>
												Submit
											</Button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{user && user.username === comment.username && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
}
