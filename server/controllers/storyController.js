const storyService = require("../services/storyService");
const userService = require("../services/userService");

const storyController = {
	getStories: async (req, res) => {
		try {
			const offset = req.query["offset"];
			const limit = req.query["limit"];

			if (offset == null || limit == null) {
				throw new Error("Empty offset or limit.");
			}

			const stories = await storyService.getStories(offset, limit);
			return res.status(200).json(stories);
		} catch (error) {
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
            res.status(500).send(error.message);
        }
    }
};

module.exports = storyController;
