const storyService = require("../services/storyService");
const userService = require("../services/userService");

const storyController = {
	getStories: async (req, res) => {
		try {
			const stories = await storyService.getStories();
			return res.status(200).json(stories);
		} catch (error) {
			console.log(error);
			res.status(500).send(error.message);
		}
	},

	getUserStories: async (req, res) => {
		try {
			const username = req.query.username;
			if (username == null) {
				throw new Error("Empty username");
			}

			const userExist = await userService.checkUserExist(username);
			if (!userExist) {
				throw new Error("User does not exist.");
			}

			const stories = await storyService.getUserStories(username);
			return res.status(200).json(stories);
		} catch (error) {
			console.log(error);
			res.status(500).send(error.message);
		}
	},

	getStory: async (req, res) => {
		try {
			const storyId = req.params.story_id;

			if (storyId == null) {
				throw new Error("Empty storyId.");
			}

			const story = await storyService.getStory(storyId);
			return res.status(200).json(story);
		} catch (error) {
			console.log(error);
			res.status(500).send(error.message);
		}
	},

	createStory: async (req, res) => {
		try {
			const title = req.body.title;
			const story = req.body.story;
			const username = req.body.username;

			if (title == null) {
				throw new Error("Empty title");
			}

			if (story == null) {
				throw new Error("Empty story");
			}

			if (username == null) {
				throw new Error("Empty username");
			}

			const exist = userService.checkUserExist(username);
			if (!exist) {
				throw new Error("User does not exist.");
			}

			const newStory = await storyService.createStory(
				title,
				story,
				username
			);
			return res.status(200).json(newStory);
		} catch (error) {
			console.log(error);
			res.status(500).send(error.message);
		}
	},

	deleteStory: async (req, res) => {
		try {
			const storyId = req.params.story_id;

			if (storyId == null) {
				throw new Error("Empty storyId.");
			}

			const exist = await storyService.checkStoryExist(storyId);
			if (!exist) {
				throw new Error("Story does not exist.");
			}

			const deletedStory = await storyService.deleteStory(storyId);
			return res.status(200).json(deletedStory);
		} catch (error) {
			console.log(error);
			res.status(500).send(error.message);
		}
	},
};

module.exports = storyController;
