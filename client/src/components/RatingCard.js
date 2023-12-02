import React from "react";
import Avatar from "boring-avatars";

import utils from "../utils";
import "../styles/RatingCard.css";

function RatingCard({ rating, comment, username, created_at }) {
    return (
        <div className="RatingCard">
            <Avatar
                size={40}
                name={username}
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <span><strong>{username}</strong> rates it {rating}/5</span>
            <p>{utils.prettifyDate(created_at)}</p>
            <p>{comment}</p>
        </div>
    )
}

export default RatingCard;