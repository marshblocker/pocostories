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

	checkUserExist: async (username) => {
		try {
			let res = await pool.query(
				"SELECT * FROM Users WHERE username = $1",
				[username]
			);

			if (res.rows.length === 0) {
				return false;
			} else if (res.rows.length === 1) {
				return true;
			} else {
				throw new Error("Found users with same username.");
			}
		} catch (error) {
			throw error;
		}
	},

	getUserPasswordHash: async (username) => {
		try {
			let res = await pool.query(
				"SELECT password FROM Users WHERE username = $1",
				[username]
			);

			if (res.rows.length === 0) {
				throw new Error('User not found.');
			}

			return res.rows[0].password;
		} catch (error) {
			throw error;
		}
	},
};

module.exports = userService;
