const { pool } = require("../db/index");

const storyService = {
	getStories: async (offset, limit) => {
		try {
			let res = await pool.query(
				"SELECT * FROM Stories ORDER BY total_ratings DESC, avg_rating DESC LIMIT $1 OFFSET $2",
				[limit, offset]
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
};

module.exports = storyService;
