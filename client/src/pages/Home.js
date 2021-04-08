import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function Home() {
	const { user } = useContext(AuthContext);
	const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);

	const { getPosts: posts } = data || {};
	return (
		<Grid columns={3}>
			<Grid.Row className="page-title">Recent Posts</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<h1>Loading..</h1>
				) : (
					posts &&
					posts.map((post) => (
						<Transition.Group>
							{
								<Grid.Column key={post.id} stye={{ marginBottom: 20 }}>
									<PostCard post={post} />
								</Grid.Column>
							}
						</Transition.Group>
					))
				)}
			</Grid.Row>
		</Grid>
	);
}
