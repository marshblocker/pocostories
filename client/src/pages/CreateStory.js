import React from "react";
import { Link, useNavigate } from "react-router-dom";
import storyService from "../services/storyService";
import handleError from "../error";

function CreateStory() {
	const navigate = useNavigate();

	async function postStory() {
		try {
			const title = document.getElementById("title-input").value.trim();
			const story = document.getElementById("story-input").value.trim();

			if (title === "") {
				alert("Empty title.");
				return;
			}

			if (story === "") {
				alert("Empty story.");
				return;
			}

            const newStory = await storyService.createStory(title, story);
            navigate('/story/' + newStory.id);
		} catch (error) {
            handleError(error);
            navigate('/create-story');
        }
	}

	return (
		<>
			<h1>create a pocostory</h1>
			<div className="title">
				<label htmlFor="title-input"> Title: </label>
				<input type="text" name="title" id="title-input" maxLength={50} required />
			</div>

			<div className="story">
				<label htmlFor="story-input"> Story: </label>
				<textarea
					name="story"
					id="story-input"
					cols={30}
					rows={10}
					maxLength={300}
					placeholder="Maximum of 300 characters only."
					required
				></textarea>
			</div>

			<button type="button" name="submit" onClick={postStory}>
				Post Story
			</button>
			<Link to="/">
				<button type="button" name="cancel">
					Cancel
				</button>
			</Link>
		</>
	);
}

export default CreateStory;
