import React from "react";
import ratingService from "../services/ratingService";

function RatingForm({ currentUser, story, storyId }) {
    function updateRatingValueIndicator(event) {
		let indicator = document.getElementById('rating-value-indicator');
		if (indicator !== null) {
			indicator.textContent = event.target.value;
		}
	}

	async function postRating() {
		try {
			let comment = document.getElementById("comment-area-input").value.trim();
			let rating = document.getElementById("rating-area-input").value;

			if (comment === "") {
				alert("Empty comment.");
				return;
			}

			if (currentUser === null) {
				throw new Error("User not logged in.");
			}

			if (currentUser === story.username) {
				throw new Error("User cannot rate its own story.");
			}

			const newRating = await ratingService.createRating(comment, rating, storyId, currentUser);
			console.log(newRating);
			window.location.reload();
		} catch (error) {
			alert(error);
            window.location.reload();
		}
	}

	return (
		<>
			<textarea
				name="comment-area"
				id="comment-area-input"
				cols={30}
				rows={10}
				placeholder="Write your comment here"
			></textarea>
			<label htmlFor="rating-area-input">Rating:</label>
			<input
				type="range"
				name="rating-area"
				id="rating-area-input"
				min={0}
				max={5}
				step={1}
				onInput={updateRatingValueIndicator}
			/>
			<p id="rating-value-indicator">5</p>
			<button type="button" name="submit" onClick={postRating}>
				Submit Rating
			</button>
		</>
	);
}

export default RatingForm;
