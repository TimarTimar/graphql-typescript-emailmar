import { ApolloServer, PubSub } from "apollo-server-express";
import express from "express";
import { start } from "node:repl";
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config/keys");

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub }),
});

/*mongoose
	.connect(MONGODB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected To Mongo");
		return server.listen({ port: PORT }).then((res) => {
			console.log(`Server running at ${res.url}`);
		});
	})
	.catch((err: Error) => {
		console.error(err);
	});
*/

async function startApolloServer() {
	const app = express();
	await mongoose.connect(MONGODB, {
		useNewUrlParser: true,
	});
	console.log("mongoose connected");
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => ({ req, pubsub }),
	});
	await server.start();
	require("./routes/surveyRoutes")(app);
	server.applyMiddleware({ app });
	app.use((req, res) => {
		res.status(200);
		res.send("Hello!");
		res.end();
	});

	await new Promise<void>((resolve) => app.listen({ port: PORT }, resolve));
	console.log(
		`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
	);
	return { server, app };
}

startApolloServer();
