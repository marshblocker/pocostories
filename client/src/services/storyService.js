import axios from "axios";

import authService from "./authService";

const URL = "http://localhost:4000";

class StoryService {
	getStory = async (storyId) => {
		try {
			let response = await axios.get(URL + "/stories/" + storyId);
			let data = response.data;
			return data;
		} catch (error) {
			throw error;
		}
	};

	createStory = async (title, story) => {
		try {
			const username = authService.getBasicAuthInCookie("username");
			if (username === null) {
				throw new Error("Not logged in.");
			}

			let response = await axios.post(URL + "/stories", {
				title: title,
				story: story,
				username: username,
			});
            let newStory = response.data;
            return newStory;
		} catch (error) {
			throw error;
		}
	};
}

const storyService = new StoryService();
export default storyService;
