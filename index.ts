import express from "express";
import {
	ApolloServer,
	PubSub,
} from "apollo-server-express"; /*might import this from apollo-server-express*/
/*import express from "express";*/
const mongoose = require("mongoose");
import bodyParser from "body-parser";

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config/keys");

mongoose
	.connect(MONGODB, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Connected To Mongo");
	});

const pubsub = new PubSub();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
const surveyRouter = require("./routes/surveyRoutes")(app);

app.listen(PORT, () => console.log(`[App]: listening on port ${PORT}`));

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true,
	context: ({ req }) => ({ req, pubsub }),
});

server.applyMiddleware({ app });

/*
const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubsub }),
});



/*
mongoose
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
/*
async function startApolloServer() {
	const app = express();
	await mongoose.connect(MONGODB, {
		useNewUrlParser: true,
	});
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
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
	return { server, app };
}

*/
