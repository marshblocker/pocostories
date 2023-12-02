import React from "react";

function UserCardBig({ user }) {
	return (
		<>
			<h1>{user.username}</h1>
			<p>
				Rating:{" "}
				{user.total_ratings === 0 ? (
					"None"
				) : (
					<>
						{user.avg_rating}/5 ({user.total_ratings} total votes)
					</>
				)}
			</p>
		</>
	);
}

export default UserCardBig;
