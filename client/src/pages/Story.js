import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RatingCard from "../components/RatingCard";
import storyService from "../services/storyService";
import ratingService from "../services/ratingService";
import authService from "../services/authService";
import utils from "../utils";
import handleError from "../error";
import RatingForm from "../components/RatingForm";
import StoryCardBig from "../components/StoryCardBig";
import "../styles/Story.css";

function Story() {
	const { id } = useParams();
	const navigate = useNavigate();
	const currentUser = authService.getBasicAuthInCookie("username");
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
					createdAt: utils.prettifyDate(retrievedStory.created_at),
				});

				let hasRatedAlready = await ratingService.hasRatedAlready(
					currentUser,
					id
				);
				if (hasRatedAlready) {
					setCanRate(false);
				}

				let retrievedRatings = await ratingService.getRatings(id);
				setRatings(retrievedRatings);
			} catch (error) {
				handleError(error);
				navigate("/");
			}
		})();
	}, []);

	const userCanRate = () => {
		return story.title !== "" && currentUser !== story.username && canRate;
	};

	return (
		<div className="Story">
			{story.title !== "" ? (
				<>
					<StoryCardBig story={story} />
					{userCanRate() ? (
						<RatingForm
							currentUser={currentUser}
							story={story}
							storyId={id}
						/>
					) : (
						""
					)}
					<div className="Ratings">
						<h2>Ratings</h2>
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
							: <p>No ratings yet.</p>}
					</div>
				</>
			) : (
				""
			)}
		</div>
	);
}

export default Story;
