import React from "react";
import { Link } from "react-router-dom";

import utils from "../utils";

function StoryCard({
	id,
	title,
	username,
	avgRating,
	totalRatings,
	createdAt,
}) {
	return (
		<>
			<div>
				<Link to={"/story/" + id}>
					<button type="button">
						<span>
							<strong>{title}</strong> {avgRating}/5 (
							{totalRatings} total votes)
						</span>
						<p>By: {username}</p>
						<p>Published at: {utils.prettifyDate(createdAt)}</p>
					</button>
				</Link>
			</div>
		</>
	);
}

export default StoryCard;
