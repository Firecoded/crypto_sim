import axios from "axios";
import { IAlertConfig } from "../components/Alert";

interface ITransactionParams {
	fromAddress: string;
	toAddress: string;
	amount: string;
}

export interface ITransaction {
	timestamp: string;
	fromAddress?: string;
	toAddress: string;
	amount: string;
}

interface IAddressInfoResponse {
	balance: string;
	transactions: ITransaction[];
}

const API_BASE = "https://jobcoin.gemini.com/passport-list/api";
const ADDRESS_API = `${API_BASE}/addresses`;
const TRANSACTIONS_API = `${API_BASE}/transactions`;

export class jobcoinAPIService {
	public alertConfig: IAlertConfig;
	public setAlertConfig: (alertConfig: IAlertConfig) => void;
	constructor(
		alertConfig: IAlertConfig,
		setAlertConfig: (alertConfig: IAlertConfig) => void
	) {
		this.alertConfig = alertConfig;
		this.setAlertConfig = setAlertConfig;
	}
	public async getAddressInfo(
		address: string
	): Promise<IAddressInfoResponse | undefined> {
		try {
			const response = await axios.get(`${ADDRESS_API}/${address}`);
			return response.data as IAddressInfoResponse;
		} catch (error) {
			this.setAlertConfig({
				showAlert: true,
				alertType: "warning",
				alertMessage: `Unable to send JobCoin, ${error.response.status}: ${error.response.statusText}`,
			});
		}
	}

	public async getTransactions() {
		try {
			const response = await axios.get(TRANSACTIONS_API);
			return response.data;
		} catch (error) {
			this.setAlertConfig({
				showAlert: true,
				alertType: "warning",
				alertMessage: `Unable to send JobCoin, ${error.response.status}: ${error.response.statusText}`,
			});
		}
	}

	public async postTransactions(transactionParams: ITransactionParams) {
		const config = {
			headers: {
				// "Content-Type": "application/json; charset=utf-8",
				Accept: "application/json",
				// "Access-Control-Allow-Origin": "*",
				// "Access-Control-Allow-Methods":
				// 	"GET, POST, PATCH, PUT, DELETE, OPTIONS",
				// "Access-Control-Allow-Headers":
				// 	"Origin, X-Requested-With, Content-Type, Accept",
				// "Access-Control-Max-Age": "86400",
			},
		};
		try {
			const response = await axios.post(
				TRANSACTIONS_API,
				transactionParams,
				config
			);
			return response.data;
		} catch (error) {
			this.setAlertConfig({
				showAlert: true,
				alertType: "warning",
				alertMessage: `Unable to send JobCoin, ${error.response.status}: ${error.response.statusText}`,
			});
		}
	}
}
