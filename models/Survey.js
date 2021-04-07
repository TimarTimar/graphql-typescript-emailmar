const { model, Schema } = require("mongoose");

const surveySchema = new Schema({
	title: String,
	subject: String,
	body: String,
	recipients: [
		{
			email: String,
			responded: { type: Boolean, default: false },
		},
	],
	username: String,
	createdAt: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

module.exports = model("Survey", surveySchema);
