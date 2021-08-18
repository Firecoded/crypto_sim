import { Loading } from "./Loading";

interface IBalanceWidgetProps {
	isLoading: boolean;
	balance?: string;
}

export const BalanceWidget = ({
	balance = "0.00",
	isLoading,
}: IBalanceWidgetProps) => {
	return (
		<div className="balance-widget-container d-flex align-items-center flex-column p-4 rounded shadow mb-4">
			<h3 className="">JobCoin Balance</h3>
			<h4 className="mt-3 text-muted">
				{isLoading ? <Loading /> : balance}
			</h4>
		</div>
	);
};
