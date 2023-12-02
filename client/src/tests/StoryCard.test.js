import React from "react";
import { render, screen } from "@testing-library/react";
import StoryCard from "../components/StoryCard";
import { BrowserRouter } from "react-router-dom";

describe("StoryCardComponent", () => {
	it("renders correctly", () => {
		render(
            <BrowserRouter>
                <StoryCard
                    avgRating={3.33}
                    createdAt={"2023-12-02 04:22:20.493299+00"}
                    id={1}
                    title={"Cubist Cow"}
                    totalRatings={10}
                    username={"max"}
                    key={1}
                />
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
