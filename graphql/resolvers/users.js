const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
	validateRegisterInput,
	validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		SECRET_KEY,
		{ expiresIn: "1h" }
	);
}

module.exports = {
	Mutation: {
		async login(_, { username, password }) {
			const { valid, errors } = validateLoginInput(username, password);

			const res = await User.findOne({ username });

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}
			if (!res) {
				errors.general = "User not found";
				throw new UserInputError("User not found", { errors });
			} else {
				const match = await bcrypt.compare(password, res.password);
				if (!match) {
					errors.general = "Wrong credentials";
					throw new UserInputError("Wrong credentials", { errors });
				}
			}

			const token = generateToken(res);
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},

		async register(
			_,
			{ registerInput: { username, email, password, confirmPassword } },
			context,
			info
		) {
			//TODO: Validate user data
			const { errors, valid } = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			// Make sure user doesnt already exist

			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError("Username is taken", {
					errors: {
						username: "This username is take",
					},
				});
			}

			//Hash password and create an auth token

			password = await bcrypt.hash(password, 12);
			const createdAt = new Date().toISOString();
			console.log(createdAt, typeof createdAt);

			const newUser = new User({
				email,
				username,
				password,
				createdAt,
			});

			const res = await newUser.save();

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
