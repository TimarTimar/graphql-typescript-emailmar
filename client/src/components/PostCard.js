import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import InvertedPopup from "../util/InvertedPopup";
export default function PostCard({
	post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
	const { user } = useContext(AuthContext);

	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment(createdAt).fromNow()}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton post={{ id, likes, likeCount }} user={user} />
				<InvertedPopup content="Comment on post">
					<Button labelPosition="right" as={Link} to={`/post/${id}`}>
						<Button color="blue" basic>
							<Icon name="comments" />
							Comment
						</Button>
						<Label basic color="blue" pointing="left">
							{commentCount}
						</Label>
					</Button>
				</InvertedPopup>
				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
}
