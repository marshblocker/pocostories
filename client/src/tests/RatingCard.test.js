import React from "react";
import { render, screen } from "@testing-library/react";
import RatingCard from "../components/RatingCard";

describe("RatingCardComponent", () => {
	it("renders correctly", () => {
		render(
			<RatingCard
				comment={"Cool"}
				created_at={"2023-12-02 04:22:20.493299+00"}
				rating={5}
				username={"max"}
			/>
		);
        const commentEl = screen.getByText(/Cool/i);
        expect(commentEl).toBeInTheDocument();
        
        const usernameEl = screen.getByText(/max/i);
        expect(usernameEl).toBeInTheDocument();
	});
});
