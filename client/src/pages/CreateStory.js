import React from "react";
import { Link, useNavigate } from "react-router-dom";
import storyService from "../services/storyService";

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
            alert(error)
            navigate('/create-story');
        }
	}

	return (
		<>
			<h1>Create Story</h1>
			<div className="title">
				<label htmlFor="title-input"> Title: </label>
				<input type="text" name="title" id="title-input" required />
			</div>

			<div className="story">
				<label htmlFor="story-input"> Story: </label>
				{/* <input type="text" name="story" id="story-input" required/> */}
				<textarea
					name="story"
					id="story-input"
					cols={30}
					rows={10}
					required
				></textarea>
			</div>

			<button type="button" name="submit" onClick={postStory}>
				Post Story
			</button>
			<Link to="/">Cancel</Link>
		</>
	);
}

export default CreateStory;
