import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import storyService from "../services/storyService";
import utils from "../utils";

function Story() {
	const { id } = useParams();
    const navigate = useNavigate();
	const [story, setStory] = useState({
		id: -99,
		title: "",
		story: "",
		username: "",
		avgRating: 0.0,
		totalRatings: 0,
		createdAt: "",
	});

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

			} catch (error) {
				if (error.response.data != null) {
					alert(error.response.data);
				} else {
					alert(error);
				}
				navigate("/");
            }
		})();
	}, []);

	return (
		<>
			{ 
				story.title !== "" ?
				(
					<>
						<h1>{story.title}</h1>
						<p>By: {story.username}</p>
						<p>Rating: {story.avgRating}/5 ({story.totalRatings} total votes)</p>
						<p>Published at: {story.createdAt}</p>
						<hr />
						<p>{story.story}</p>
					</>
				)
				: "" 
			}
		</>
	);
}

export default Story;
