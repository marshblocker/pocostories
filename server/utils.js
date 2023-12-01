const bcrypt = require("bcrypt");

const utils = {
	hashPassword: async (password) => {
		const hash = await bcrypt.hash(password, 10);
		console.log(hash);
		return hash;
	},

	isCorrectPassword: async (password, hash) => {
		return await bcrypt.compare(password, hash);
	},
};

module.exports = utils;
