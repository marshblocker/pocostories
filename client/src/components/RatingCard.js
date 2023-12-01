import React from "react";

import utils from "../utils";

function RatingCard({ rating, comment, username, created_at }) {
    return (
        <>
            <span><strong>{username}</strong> {rating}/5</span>
            <p>{utils.prettifyDate(created_at)}</p>
            <p>{comment}</p>
        </>
    )
}

export default RatingCard;