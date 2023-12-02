import React from "react";
import { render, screen } from "@testing-library/react";
import UserCardBig from "../components/UserCardBig";
import { BrowserRouter } from "react-router-dom";

describe("UserCardBigComponent", () => {
	it("renders correctly", () => {
		render(
            <BrowserRouter>
                <UserCardBig user={{
                    username: "max",
                    total_ratings: 10,
                    avg_rating: 3.33,
                }} />
            </BrowserRouter>
		);

        const usernameEl = screen.getByText(/max/i);
        expect(usernameEl).toBeInTheDocument();

        const avgRatingEl = screen.getByText(/3.33/i);
        expect(avgRatingEl).toBeInTheDocument();

        const totalRatingsEl = screen.getByText(/10/i);
        expect(totalRatingsEl).toBeInTheDocument();
	});
});
