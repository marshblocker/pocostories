import React, { useEffect, useState } from "react";

import StoryCard from "../components/StoryCard";
import { useNavigate } from "react-router-dom";
import storyService from "../services/storyService";
import handleError from "../error";

function Stories() {
	const [stories, setStories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const retrievedStories = await storyService.getStories();
				setStories(retrievedStories);
			} catch (error) {
				handleError(error);
				navigate("/");
			}
		})();
	}, []);

	return (
		<>
			<h1>Stories</h1>
			{stories.length !== 0
				? stories.map((story) => (
						<StoryCard
							avgRating={story.avg_rating}
							createdAt={story.created_at}
							id={story.id}
							title={story.title}
							totalRatings={story.total_ratings}
							username={story.username}
							key={story.id}
						/>
				  ))
				: "No stories"}
		</>
	);
}

export default Stories;
