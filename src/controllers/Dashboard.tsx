import { useCallback, useEffect, useState } from "react";
import { IAlertConfig } from "../components/Alert";
import { BalanceWidget } from "../components/BalanceWidget";
import { LineChart } from "../components/LineChart";
import { Nav } from "../components/Nav";
import { SendCoinWidget } from "../components/SendCoinWidget";
import { ITransaction, jobcoinAPIService } from "../services/jobcoinAPIService";

interface IDashboardProps {
	setIsAuthorized: (isAuthorized: boolean) => void;
	jobCoinAddress: string;
	alertConfig: IAlertConfig;
	setAlertConfig: (alertConfig: IAlertConfig) => void;
}

interface ITransformedTransaction extends ITransaction {
	balance: string;
	timestampShort: string;
}

export const Dashboard = ({
	setIsAuthorized,
	jobCoinAddress,
	alertConfig,
	setAlertConfig,
}: IDashboardProps) => {
	const [balanceIsLoading, setBalanceIsLoading] = useState(true);
	const [balance, setBalance] = useState("0.00");
	const [transactions, setTransactions] = useState<ITransformedTransaction[]>(
		[]
	);
	const [apiService] = useState<jobcoinAPIService>(
		new jobcoinAPIService(alertConfig, setAlertConfig)
	);

	const [destAddressValue, setDestAddressValue] = useState("");
	const [sendAmountValue, setSendAmountValue] = useState("");

	const fetchBalanceDetails = useCallback(async () => {
		const transformData = (transactionDetails: ITransaction[]) => {
			let balance = 0;
			setTransactions(
				transactionDetails.map((t) => {
					const ts = new Date(t.timestamp);
					if (t.fromAddress !== jobCoinAddress) {
						balance += +t.amount;
					} else {
						balance -= +t.amount;
					}
					return {
						...t,
						timestamp: ts.toDateString(),
						balance: balance.toString(),
						timestampShort: `${ts.getMonth() + 1}/${ts.getDate()}`,
					};
				})
			);
		};
		try {
			setBalanceIsLoading(true);
			const details = await apiService.getAddressInfo(jobCoinAddress);
			if (details) {
				if (details.balance) {
					setBalance(details.balance);
				}
				if (details.transactions) {
					transformData(details.transactions);
				}
			}
		} catch (error) {
			// handled in api service
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
			// handled in api service
		} finally {
			fetchBalanceDetails();
		}
	};

	const handleSendJobCoins = () => {
		sendTransaction();
	};

	const buildToolTip = (transaction: ITransformedTransaction) => {
		const sent = transaction.fromAddress === jobCoinAddress;
		const buildMessage = () => {
			if (sent) {
				return `${transaction.fromAddress} sent ${transaction.amount} JobCoin to ${transaction.toAddress}`;
			}
			return `${jobCoinAddress} recieved ${transaction.amount} JobCoin ${
				transaction.fromAddress ? `from ${transaction.fromAddress}` : ""
			}`;
		};
		return (
			<div className="card p-3">
				<div className="card-body p-0 m-0">
					<h5 className="card-title">{`Balance: ${transaction.balance} JobCoin`}</h5>

					<h6 className="card-subtitle text-muted mb-2">
						{transaction.timestamp}
					</h6>
					<p className="card-text">{buildMessage()}</p>
				</div>
			</div>
		);
	};

	return (
		<div className="dashboards-container">
			<Nav
				setIsAuthorized={setIsAuthorized}
				alertConfig={alertConfig}
				setAlertConfig={setAlertConfig}
			/>
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
								xKey={"balance"}
								yKey={"timestampShort"}
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
