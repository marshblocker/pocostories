import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RatingCard from "../components/RatingCard";
import storyService from "../services/storyService";
import ratingService from "../services/ratingService";
import authService from "../services/authService";
import utils from "../utils";

function Story() {
	const { id } = useParams();
    const navigate = useNavigate();
	const currentUser = authService.getBasicAuthInCookie('username');
	const [story, setStory] = useState({
		id: -99,
		title: "",
		story: "",
		username: "",
		avgRating: 0.0,
		totalRatings: 0,
		createdAt: "",
	});
	const [canRate, setCanRate] = useState(true);
	const [ratings, setRatings] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				let retrievedStory = await storyService.getStory(id);
                setStory({
					id: retrievedStory.id,
					title: retrievedStory.title,
					story: retrievedStory.story,
					username: retrievedStory.username,
					avgRating: retrievedStory.avg_rating,
					totalRatings: retrievedStory.total_ratings,
					createdAt: utils.prettifyDate(retrievedStory.created_at)
				});

				let hasRatedAlready = await ratingService.hasRatedAlready(currentUser, id);
				if (hasRatedAlready) {
					setCanRate(false);
				}

				let retrievedRatings = await ratingService.getRatings(id);
				setRatings(retrievedRatings);
			} catch (error) {
				if (error.response.data) {
					alert(error.response.data);
				} else {
					alert(error)
				}
				navigate("/");
            }
		})();
	}, []);

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

			const newRating = await ratingService.createRating(comment, rating, id, currentUser);
			console.log(newRating);
			window.location.reload();
		} catch (error) {
			alert(error);
            window.location.reload();
		}
	}

	return (
		<>
			{story.title !== "" ? (
				<>
					<h1>{story.title}</h1>
					<p>By: {story.username}</p>
					<p>
						Rating: {story.avgRating}/5 ({story.totalRatings} total
						votes)
					</p>
					<p>Published at: {story.createdAt}</p>
					<hr />
					<p>{story.story}</p>
				</>
			) : (
				""
			)}
			{story.title !== "" && currentUser !== story.username && canRate ? (
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
			) : (
				""
			)}
			{ratings.length !== 0
				? ratings.map((rating) => (
						<RatingCard
							comment={rating.comment}
							rating={rating.rating}
							created_at={rating.created_at}
							username={rating.username}
							key={rating.id}
						/>
				  ))
				: ""}
		</>
	);
}

export default Story;
