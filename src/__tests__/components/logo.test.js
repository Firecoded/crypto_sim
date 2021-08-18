import { render, screen } from "@testing-library/react";
import { Logo } from "../../components/Logo";

const MOCK_PROPS = {
	height: "300px",
	showSmallLogo: false,
};

const ALT_LARGE = "jobcoin logo large";
const ALT_SMALL = "jobcoin logo small";

describe("Logo", () => {
	test("Renders large logo", () => {
		render(<Logo {...MOCK_PROPS} />);
		expect(screen.getByAltText(ALT_LARGE)).toBeInTheDocument();
		expect(screen.queryByAltText(ALT_SMALL)).toBeNull();
	});
	test("Renders small logo", () => {
		MOCK_PROPS.showSmallLogo = true;
		render(<Logo {...MOCK_PROPS} />);
		expect(screen.getByAltText(ALT_SMALL)).toBeInTheDocument();
		expect(screen.queryByAltText(ALT_LARGE)).toBeNull();
	});
});
