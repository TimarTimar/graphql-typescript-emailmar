import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";
import InvertedPopup from "../util/InvertedPopup";
import {
	FETCH_POSTS_QUERY,
	DELETE_COMMENT_MUTATION,
	DELETE_POST_MUTATION,
} from "../util/graphql";

export default function DeleteButton({ postId, commentId, callback }) {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
	const [deletePostOrMutation] = useMutation(mutation, {
		update(proxy) {
			setConfirmOpen(false);
			if (!commentId) {
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY,
				});
				proxy.writeQuery({
					query: FETCH_POSTS_QUERY,
					data: {
						getPosts: data.getPosts.filter((p) => p.id !== postId),
					},
				});
			}
			if (callback) {
				callback();
			}
		},
		variables: {
			postId,
			commentId,
		},
	});
	return (
		<InvertedPopup content={commentId ? "Delte comment" : "Delete post"}>
			<div>
				<Button
					as="div"
					color="red"
					floated="right"
					onClick={() => {
						setConfirmOpen(true);
					}}
				>
					<Icon name="trash" style={{ margin: 0 }} />
				</Button>
				<Confirm
					open={confirmOpen}
					onCancel={() => setConfirmOpen(false)}
					onConfirm={deletePostOrMutation}
				/>
			</div>
		</InvertedPopup>
	);
}
