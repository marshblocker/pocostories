const { pool } = require("../db/index");

const ratingService = {
	getRatings: async (storyId) => {
		try {
			let res = await pool.query(
				"SELECT * FROM Ratings WHERE story_id = $1 ORDER BY created_at DESC",
				[storyId]
			);

			return res.rows;
		} catch (error) {
			throw error;
		}
	},

	createRating: async (rating, comment, username, storyId) => {
		try {
			let res = await pool.query(
				"INSERT INTO Ratings (rating, comment, username, story_id) VALUES ($1, $2, $3, $4) RETURNING *",
				[rating, comment, username, storyId]
			);

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	},
};

module.exports = ratingService;
