import { useCallback, useEffect, useState } from "react";
import { BalanceWidget } from "../components/BalanceWidget";
import { LineChart } from "../components/LineChart";
import { Nav } from "../components/Nav";
import { SendCoinWidget } from "../components/SendCoinWidget";
import { ITransaction, jobcoinAPIService } from "../services/jobcoinAPIService";

interface IDashboardProps {
	apiService: jobcoinAPIService;
	setIsAuthorized: (isAuthorized: boolean) => void;
	jobCoinAddress: string;
}

export const Dashboard = ({
	setIsAuthorized,
	jobCoinAddress,
	apiService,
}: IDashboardProps) => {
	const [balanceIsLoading, setBalanceIsLoading] = useState(true);
	const [balance, setBalance] = useState("0.00");
	const [transactions, setTransactions] = useState<ITransaction[]>([]);

	const [destAddressValue, setDestAddressValue] = useState("");
	const [sendAmountValue, setSendAmountValue] = useState("");

	const fetchBalanceDetails = useCallback(async () => {
		try {
			setBalanceIsLoading(true);
			const details = await apiService.getAddressInfo(jobCoinAddress);
			if (details) {
				if (details.balance) {
					setBalance(details.balance);
				}
				if (details.transactions) {
					setTransactions(
						details.transactions.map((t) => {
							const ts = new Date(t.timestamp);
							return {
								...t,
								timestamp: ts.toDateString(),
							};
						})
					);
				}
			}
		} catch (error) {
			// add alerting
		} finally {
			setBalanceIsLoading(false);
		}
	}, [apiService, jobCoinAddress]);

	useEffect(() => {
		fetchBalanceDetails();
	}, [fetchBalanceDetails]);

	const sendTransaction = async () => {
		try {
			const sendParams = {
				fromAddress: jobCoinAddress,
				toAddress: destAddressValue,
				amount: sendAmountValue,
			};
			await apiService.postTransactions(sendParams);
		} catch (error) {
			// add alerting
		} finally {
			fetchBalanceDetails();
		}
	};

	const handleSendJobCoins = () => {
		sendTransaction();
	};

	const buildToolTip = (transaction: ITransaction) => {
		const sent = transaction.fromAddress === jobCoinAddress;
		return (
			<div className="card p-3">
				<div className="card-body p-0 m-0">
					<h5 className="card-title">{`${
						sent ? "Sent" : "Recieved"
					} ${transaction.amount} JobCoin`}</h5>
					<h6 className="card-subtitle text-muted mb-2">
						{transaction.timestamp}
					</h6>
					<p className="card-text">{`${
						transaction.fromAddress
							? `From ${transaction.fromAddress} `
							: ""
					} To ${transaction.toAddress}`}</p>
				</div>
			</div>
		);
	};

	return (
		<div className="dashboards-container">
			<Nav setIsAuthorized={setIsAuthorized} />
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-6 col-sm-12">
						<BalanceWidget
							isLoading={balanceIsLoading}
							balance={balance}
						/>
						<SendCoinWidget
							destAddressValue={destAddressValue}
							setDestAddressValue={setDestAddressValue}
							sendAmountValue={sendAmountValue}
							setSendAmountValue={setSendAmountValue}
							onSend={handleSendJobCoins}
						/>
					</div>
					<div className="col-lg-8 col-md-6 col-sm-12 p-0">
						<div className="line-chart-container w-100 rounded shadow p-0 pt-3">
							<h3 className="pb-2 text-center">
								JobCoin Transfer History
							</h3>
							<LineChart
								data={transactions.map((t) => {
									return {
										...t,
										toolTip: buildToolTip(t),
									};
								})}
								xKey={"amount"}
								yKey={"toAddress"}
								isLoading={balanceIsLoading}
								height={600}
								noDataMessage={
									"No JobCoin Transactions Made, Send or Recieve to See History"
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
