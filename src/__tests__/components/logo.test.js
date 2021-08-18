import { render, screen } from "@testing-library/react";
import { Logo } from "../../components/Logo";

const MOCK_PROPS = {
	height: "300px",
	showSmallLogo: false,
};

describe("Balance Widget", () => {
	test("Renders Large logo", () => {
		render(<Logo {...MOCK_PROPS} />);
		expect(screen.getByAltText("jobcoin logo large")).toBeInTheDocument();
		expect(screen.queryByAltText("jobcoin logo small")).toBeNull();
	});
	test("Renders spinner, no balance when loading", () => {
		MOCK_PROPS.showSmallLogo = true;
		render(<Logo {...MOCK_PROPS} />);
		expect(screen.getByAltText("jobcoin logo small")).toBeInTheDocument();
		expect(screen.queryByAltText("jobcoin logo marge")).toBeNull();
	});
});
