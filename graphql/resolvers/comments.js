const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Mutation: {
		createComment: async (_, { postId, body }, context) => {
			const { username } = checkAuth(context);
			if (body.trim() === "") {
				throw new UserInputError("Empty comment", {
					errors: {
						body: "Comment body must not be empty",
					},
				});
			}
			const post = await Post.findById(postId);

			if (post) {
				//mongoose allow us to do this, because its return a json object
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});
				await post.save();
				return post;
			} else {
				throw new UserInputError("Post not found");
			}
		},
		async deleteComment(_, { postId, commentId }, context) {
			const { username } = checkAuth(context);

			const post = await Post.findById(postId);

			if (post) {
				/*The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
                const array1 = [5, 12, 8, 130, 44];

                    const isLargeNumber = (element) => element > 13;

                    console.log(array1.findIndex(isLargeNumber));
                    // expected output: 3*/

				const commentIndex = post.comments.findIndex((c) => c.id === commentId);
				if (post.comments[commentIndex].username === username) {
					post.comments.splice(commentIndex, 1);
					await post.save();
					return post;
				} else {
					throw new AuthenticationError("Action not allowed");
				}
			} else {
				new UserInputError("Post not found");
			}
		},
		async likePost(_, { postId }, context) {
			const { username } = checkAuth(context);

			const post = await Post.findById(postId);

			if (post) {
				if (post.likes.find((like) => like.username === username)) {
					//post already liked, unlike it
					post.likes = post.likes.filter((like) => like.username !== username);
				} else {
					//not liked, like post
					post.likes.push({
						username,
						createdAt: new Date().toISOString(),
					});
				}

				await post.save();
				return post;
			} else {
				throw new UserInputError("Post not Found");
			}
		},
	},
};
