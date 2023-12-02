const { pool } = require("../db/index");

const storyService = {
	getStories: async () => {
		try {
			let res = await pool.query(
				"SELECT * FROM Stories ORDER BY total_ratings DESC, avg_rating DESC"
			);

			return res.rows;
		} catch (error) {
			throw error;
		}
	},

	getUserStories: async (username) => {
		try {
			let res = await pool.query(
				"SELECT * FROM Stories WHERE username = $1 ORDER BY total_ratings DESC, avg_rating DESC",
				[username]
			);

			return res.rows;
		} catch (error) {
			throw error;
		}
	},

	getStory: async (storyId) => {
		try {
			let res = await pool.query("SELECT * FROM Stories WHERE id = $1", [
				storyId,
			]);

			if (res.rows.length === 0) {
				throw new Error("No story found.");
			}

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	},

	createStory: async (title, story, username) => {
		try {
			let res = await pool.query(
				"INSERT INTO Stories (title, story, username) VALUES ($1, $2, $3) RETURNING *",
				[title, story, username]
			);

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	},

	deleteStory: async (storyId) => {
		try {
			let res = await pool.query(
				"DELETE FROM Stories WHERE id = $1 RETURNING *",
				[storyId]
			);

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	},

	checkStoryExist: async (storyId) => {
		try {
			let res = await pool.query("SELECT * FROM Stories WHERE id = $1", [
				storyId,
			]);

			if (res.rows.length === 1) {
				return true;
			} else if (res.rows.length === 0) {
				return false;
			} else {
				throw new Error("Found stories with same storyId.");
			}
		} catch (error) {
			throw error;
		}
	},

	updateRating: async (storyId) => {
		try {
			let res = await pool.query(
				"SELECT ROUND(AVG(rating)::numeric, 2) AS avg_rating, COUNT(rating) AS total_ratings FROM Ratings WHERE story_id = $1",
				[storyId]
			);
			let newAvgRating = res.rows[0].avg_rating;
			let newTotalRatings = res.rows[0].total_ratings;

			res = await pool.query(
				"UPDATE Stories SET avg_rating = $1, total_ratings = $2 WHERE id = $3 RETURNING *",
				[newAvgRating, newTotalRatings, storyId]
			);

			const updatedStory = res.rows[0];
			return updatedStory;
		} catch (error) {
			throw error;
		}
	},
};

module.exports = storyService;
