import { render, screen } from "@testing-library/react";
import { BalanceWidget } from "../../components/BalanceWidget";

const MOCK_PROPS = {
	balance: "25",
	isLoading: false,
};

describe("Balance Widget", () => {
	test("Renders Balance", () => {
		render(<BalanceWidget {...MOCK_PROPS} />);
		expect(screen.getByText(MOCK_PROPS.balance)).toBeInTheDocument();
	});
	test("Renders spinner, no balance when loading", () => {
		MOCK_PROPS.isLoading = true;
		render(<BalanceWidget {...MOCK_PROPS} />);
		expect(screen.queryByText(MOCK_PROPS.balance)).toBeNull();
		expect(screen.getByTestId("isLoading")).toBeInTheDocument();
	});
});
