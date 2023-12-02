import React from "react";
import ratingService from "../services/ratingService";
import "../styles/RatingForm.css";

function RatingForm({ currentUser, story, storyId }) {
    function updateRatingValueIndicator(event) {
		let indicator = document.getElementById('rating-value-indicator');
		if (indicator !== null) {
			indicator.textContent = "Rating: " + event.target.value;
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
		<div className="RatingForm">
			<h2>Rate this pocostory</h2>
			<div className="rating-area">
				<input
					type="range"
					name="rating-area"
					id="rating-area-input"
					min={0}
					max={5}
					step={1}
					onInput={updateRatingValueIndicator}
				/>
				<p id="rating-value-indicator">Rating: 5</p>
			</div>
			<textarea
				name="comment-area"
				id="comment-area-input"
				cols={30}
				rows={10}
				placeholder="Write your comment here"
			></textarea>
			<br />
			<button type="button" name="submit" onClick={postRating}>
				Submit Rating
			</button>
		</div>
	);
}

export default RatingForm;
