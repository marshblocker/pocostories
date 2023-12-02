import React from "react";
import { Link } from "react-router-dom";
import Avatar from "boring-avatars";

import "../styles/StoryCardBig.css"

function StoryCardBig({ story }) {
	return (
		<>
			<h1>{story.title}</h1>
			<p>
				By: <Link to={"/user/" + story.username}>{story.username}</Link>
			</p>
			<p>
				Rating: {story.avgRating}/5 ({story.totalRatings} total votes)
			</p>
			<p>Published at: {story.createdAt}</p>
			<hr />
			<p id="story-text">{story.story}</p>
			<hr />
		</>
	);
}

export default StoryCardBig;
