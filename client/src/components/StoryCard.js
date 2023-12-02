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
						<strong>{title}</strong>
						<p>By: {username}</p>
						<p>
							{totalRatings === 0 ? 
								"(No rating)" : 
								<>Rating: {avgRating}/5 ({totalRatings} total votes)</>
							}
						</p>
						<p>Published at: {utils.prettifyDate(createdAt)}</p>
					</button>
				</Link>
			</div>
		</>
	);
}

export default StoryCard;
