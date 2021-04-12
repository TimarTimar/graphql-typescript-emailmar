import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Button, Icon, Label } from "semantic-ui-react";
import InvertedPopup from "../util/InvertedPopup";
import { LIKE_POST_MUTATION } from "../util/graphql";

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
	const [liked, setLiked] = useState(false);
	useEffect(() => {
		if (user && likes?.find((like) => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [user, likes]);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});

	const likeButton = user ? (
		liked ? (
			<Button color="teal">
				<Icon name="heart" />
				Like
			</Button>
		) : (
			<Button color="teal" basic>
				<Icon name="heart" />
				Like
			</Button>
		)
	) : (
		<Button as={Link} to="/login" color="teal" basic>
			<Icon name="heart" />
			Like
		</Button>
	);

	return (
		<div>
			<Button as="div" labelPosition="right" onClick={likePost}>
				<InvertedPopup content={liked ? "Unlike" : "Like"}>
					{likeButton}
				</InvertedPopup>
				<Label basic color="teal" pointing="left">
					{likeCount}
				</Label>
			</Button>
		</div>
	);
}
