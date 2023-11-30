const { pool } = require("../db/index");

const userService = {
	createUser: async (username, password) => {
		try {
			let res = await pool.query(
				"INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING *",
				[username, password]
			);

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	},

	getUsersWithSameUsername: async (username) => {
		try {
			let res = await pool.query(
				"SELECT * FROM Users WHERE username = $1",
				[username]
			);

			return res.rows;
		} catch (error) {
			throw error;
		}
	},
};

module.exports = userService;
