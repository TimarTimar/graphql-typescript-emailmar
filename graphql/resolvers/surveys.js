const { UserInputError } = require("apollo-server-errors");
const Survey = require("../../models/Survey");
const User = require("../../models/User");
const checkAuth = require("../../util/check-auth");
const Mailer = require("../../services/Mailer");
const surveyTemplate = require("../../services/emailTemplates/surveyTemplate");
const { response } = require("express");
module.exports = {
	Query: {
		async getSurveys() {
			console.log("getSurveys");
			try {
				const surveys = await Survey.find().sort({ createdAt: -1 });
				return surveys;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getSurvey(_, { surveyId }, context) {
			console.log("getSurvey");
			const { username } = checkAuth(context);
			try {
				const survey = await Survey.findById(surveyId);
				if (survey && survey.username === username) {
					return survey;
				} else {
					throw new UserInputError("We could not find this survey");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		// only return the logged in users survey, return empty list if he/she dont have any
		async getSurveysByUser(_, __, context) {
			console.log("getSurveyByUser");
			const me = checkAuth(context);
			try {
				const surveys = await Survey.find({ user: me.id });
				if (surveys) {
					return surveys;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createSurvey(
			_,
			{ surveyInput: { title, subject, body, recipients } },
			context
		) {
			console.log("createSurvey");
			//get error if something missing, and cant move towards
			const user = checkAuth(context);

			const formattedRecipients = recipients.split(",").map((recipient) => {
				return {
					email: recipient,
					responded: false,
				};
			});

			const newSurvey = new Survey({
				title,
				subject,
				body,
				recipients: formattedRecipients,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
				dateSent: new Date().toISOString(),
			});

			const survey = await newSurvey.save();

			return survey;
		},
		async createSurveyAndSend(
			_,
			{ surveyInput: { title, subject, body, recipients } },
			context
		) {
			console.log("createSurveyAndSend");
			//get error if something missing, and cant move towards
			const user = checkAuth(context);

			const formattedRecipients = recipients.split(",").map((recipient) => {
				return {
					email: recipient,
					responded: false,
				};
			});

			const newSurvey = new Survey({
				title,
				subject,
				body,
				recipients: formattedRecipients,
				state: "sent",
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
				dateSent: new Date().toISOString(),
			});

			//attempt to send
			const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

			try {
				const userResponse = await User.findById(user.id);
				if (userResponse.credits < 1) {
					throw new UserInputError("Not enough credits for this action");
				}
				userResponse.credits -= 1;

				await mailer.send();
				await newSurvey.save();
				const updatedUser = await userResponse.save();
				return updatedUser;
			} catch (err) {
				throw new Error(err);
			}
		},
		async deleteSurvey(_, { surveyId }, context) {
			console.log("deleteSurvey");
			try {
				const { username } = checkAuth(context);

				const survey = await Survey.findById(surveyId);

				if (survey && survey.username === username) {
					await survey.delete();
					return "Survey deleted successfully";
				} else {
					throw new UserInputError("Action not allowed");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
		async editSurvey(
			_,
			{ surveyInput: { title, subject, body, recipients }, surveyId },
			context
		) {
			console.log("editSurvey");
			const user = checkAuth(context);

			const formattedRecipients = recipients.split(",").map((recipient) => {
				return {
					email: recipient,
					responded: false,
				};
			});

			const editedSurvey = {
				title,
				subject,
				body,
				recipients: formattedRecipients,
			};

			try {
				const survey = await Survey.findByIdAndUpdate(surveyId, editedSurvey, {
					new: true,
				});
				if (survey) {
					return survey;
				}
				throw new UserInputError(
					"Could not find this survey with the given ID"
				);
			} catch (err) {
				throw new Error(err);
			}
		},
		async quickSendSurvey(_, { surveyId }, context) {
			console.log("quickSendSurvey");
			//get error if something missing, and cant move towards
			const user = checkAuth(context);
			const filter = { _id: surveyId };
			const update = { state: "sent", dateSent: new Date().toISOString() };

			const responseSurvey = await Survey.findOneAndUpdate(filter, update);

			const responseUser = await User.findById(user.id);

			if (responseUser && responseUser.credits > 0 && response) {
				//attempt to send
				const mailer = new Mailer(
					responseSurvey,
					surveyTemplate(responseSurvey)
				);
				try {
					await mailer.send();
					responseUser.credits -= 1;
					await responseUser.save();
					return responseSurvey;
				} catch (err) {
					throw new Error(err);
				}
			} else {
				return;
			}
		},
		async editSurveyAndSend(
			_,
			{ surveyInput: { title, subject, body, recipients }, surveyId },
			context
		) {
			console.log("editSurveyAndSend");
			const user = checkAuth(context);

			const formattedRecipients = recipients.split(",").map((recipient) => {
				return {
					email: recipient,
					responded: false,
				};
			});

			const editedSurvey = {
				title,
				subject,
				body,
				sent: "sent",
				recipients: formattedRecipients,
				dateSent: new Date().toISOString(),
			};

			const responseUser = await User.findById(user.id);
			const responseSurvey = await Survey.findByIdAndUpdate(
				surveyId,
				editedSurvey,
				{
					new: true,
				}
			);
			//attempt to send
			const mailer = new Mailer(responseSurvey, surveyTemplate(responseSurvey));

			if (responseUser && responseUser.credits > 0 && responseSurvey) {
				try {
					await mailer.send();
					responseUser.credits -= 1;
					await responseUser.save();
					return responseSurvey;
				} catch (err) {
					throw new Error(err);
				}
			} else
				(err) => {
					throw new new Error(err)();
				};
		},
	},
};
