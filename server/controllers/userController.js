var userService = require("../services/userService");
var utils = require("../utils");

const userController = {
	createUser: async (req, res) => {
		try {
			const userInfo = req.body.userInfo;
			const username = userInfo.username;
			const password = userInfo.password;

			if (username == null) {
				throw new Error('empty username.');
			}

			if (password == null) {
				throw new Error('empty password');
			}

			let exist = await userService.checkUserExist(username);
			if (exist) {
				throw new Error('username already exists.');
			}

			const passwordHash = await utils.hashPassword(password);

			let newUser = await userService.createUser(username, passwordHash);
			return res.status(200).json(newUser);
		} catch (error) {
			res.status(500).send(error.message);
		}
	},
};

module.exports = userController;
