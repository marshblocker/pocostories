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
				throw new Error("User not found.");
			}

			return res.rows[0].password;
		} catch (error) {
			throw error;
		}
	},

	updateRating: async (username) => {
		try {
			let res = await pool.query(
				`SELECT ROUND(AVG(R.rating)::numeric, 2) AS avg_rating, COUNT(R.rating) AS total_ratings
				FROM Ratings R
				JOIN Stories S ON R.story_id = S.id
				WHERE S.username = $1
				`,
				[username]
			);
			let newAvgRating = res.rows[0].avg_rating;
			let newTotalRatings = res.rows[0].total_ratings;

			res = await pool.query(
				"UPDATE Users SET avg_rating = $1, total_ratings = $2 WHERE username = $3 RETURNING *",
				[newAvgRating, newTotalRatings, username]
			);

			const updatedUser = res.rows[0];
			return updatedUser;
		} catch (error) {
			throw error;
		}
	},
};

module.exports = userService;
