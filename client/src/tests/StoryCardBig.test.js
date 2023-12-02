import React from "react";
import { render, screen } from "@testing-library/react";
import StoryCardBig from "../components/StoryCardBig";
import { BrowserRouter } from "react-router-dom";

describe("StoryCardBigComponent", () => {
	it("renders correctly", () => {
		render(
            <BrowserRouter>
                <StoryCardBig story={{
                    avgRating: 3.33,
                    createdAt: "2023-12-02 04:22:20.493299+00",
                    id: 1,
                    title: "Cubist Cow",
                    totalRatings: 10,
                    username: "max"
                }} />
            </BrowserRouter>
		);

        const titleEl = screen.getByText(/Cubist Cow/i);
        expect(titleEl).toBeInTheDocument();

        const usernameEl = screen.getByText(/max/i);
        expect(usernameEl).toBeInTheDocument();

        const totalRatingsEl = screen.getByText(/10/i);
        expect(totalRatingsEl).toBeInTheDocument();
	});
});
