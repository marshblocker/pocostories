import React from "react";
import Avatar from "boring-avatars";
import "../styles/UserCardBig.css";

function UserCardBig({ user }) {
	return (
		<>
			<div className="profile">
				<Avatar
					size={100}
					name={user.username}
					variant="beam"
					colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
				/>
				<h1>{user.username}</h1>
			</div>
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
