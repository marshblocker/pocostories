const ratingService = require("../services/ratingService");
const storyService = require("../services/storyService");
const userService = require("../services/userService");

const ratingController = {
	getRatings: async (req, res) => {
		try {
			const storyId = req.params.story_id;

			if (storyId == null) {
				throw new Error("Empty storyId.");
			}

			const exist = await storyService.checkStoryExist(storyId);
			if (!exist) {
				throw new Error("Story does not exist.");
			}

			const ratings = await ratingService.getRatings(storyId);
			return res.status(200).json(ratings);
		} catch (error) {
			console.log(error);
			res.status(500).send(error.message);
		}
	},

	getUserRating: async (req, res) => {
		try {
			const storyId = req.params.story_id;
			const username = req.query.username;

			if (storyId == null) {
				throw new Error("Empty storyId.");
			}

			const exist = await storyService.checkStoryExist(storyId);
			if (!exist) {
				throw new Error("Story does not exist.");
			}

			const rating = await ratingService.getUserRating(storyId, username);
			return res.status(200).json(rating);
		} catch (error) {
			console.log(error);
			res.status(500).send(error.message);
		}
	},

	createRating: async (req, res) => {
		try {
			const rating = req.body.rating;
			const comment = req.body.comment;
			const username = req.body.username;
			const storyId = req.params.story_id;

			if (rating == null) {
				throw new Error("Empty rating.");
			}

			if (comment == null) {
				throw new Error("Empty comment.");
			}

			if (username == null) {
				throw new Error("Empty username.");
			}

			if (storyId == null) {
				throw new Error("Empty storyId.");
			}

			const userExist = await userService.checkUserExist(username);
			if (!userExist) {
				throw new Error("User does not exist.");
			}

			const storyExist = await storyService.checkStoryExist(storyId);
			if (!storyExist) {
				throw new Error("Story does not exist.");
			}

			const storyCreatorUsername = (await storyService.getStory(storyId))
				.username;

			if (username === storyCreatorUsername) {
				throw new Error("User cannot rate its own story.");
			}

			const newRating = await ratingService.createRating(
				rating,
				comment,
				username,
				storyId
			);
			console.log("newRatings", newRating);

			const story = await storyService.getStory(storyId);
			const storyCreator = story.username;

			const updatedUser = await userService.updateRating(storyCreator);
			console.log("updatedUser", updatedUser);

			const updatedStory = await storyService.updateRating(storyId);
			console.log("updatedStory", updatedStory);

			return res.status(200).json(newRating);
		} catch (error) {
			console.log(error)
			res.status(500).send(error.message);
		}
	},
};

module.exports = ratingController;
