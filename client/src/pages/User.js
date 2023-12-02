import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import StoryCard from "../components/StoryCard";
import UserCardBig from "../components/UserCardBig";
import userService from "../services/userService";
import storyService from "../services/storyService";
import handleError from "../error";

function User() {
	const { username } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: "",
		avg_rating: 0.0,
		total_ratings: 0
	});
	const [stories, setStories] = useState([])

	useEffect(() => {
		(async () => {
			try {
				let retrievedUser = await userService.getUser(username);
				setUser({
					username: retrievedUser.username,
					avg_rating: retrievedUser.avg_rating,
					total_ratings: retrievedUser.total_ratings
				});

				let retrievedStories = await storyService.getUserStories(username);
				setStories(retrievedStories);
			} catch (error) {
				handleError(error);
				navigate('/');
			}
		})()
	}, [username]);

	return (
		<>
			{user.username !== "" ? (
				<>
					<UserCardBig user={user} />
					<h2>Published stories</h2>
					{stories.length > 0
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
						: "None"}
				</>
			) : (
				""
			)}
		</>
	);
}

export default User;
