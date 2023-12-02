var userService = require("../services/userService");
var utils = require("../utils");

const loginController = {
	loginUser: async (req, res) => {
		try {
			const credentials = req.body.credentials;
			const username = credentials.username;
			const password = credentials.password;

			if (username == null || password == null) {
				throw new Error("Invalid credentials.");
			}

			const exist = await userService.checkUserExist(username);
			if (!exist) {
				throw new Error("User does not exist.");
			}

			const passwordHash = await userService.getUserPasswordHash(
				username
			);

			const isCorrectPassword = await utils.isCorrectPassword(
				password,
				passwordHash
			);
			if (!isCorrectPassword) {
				throw new Error("Wrong password.");
			}

			return res
				.status(200)
				.json({ username: username, password: password });
		} catch (error) {
			console.log(error);
			res.status(500).send(error.message);
		}
	},
};

module.exports = loginController;
