import axios from "axios";

interface ITransactionParams {
	fromAddress: string;
	toAddress: string;
	amount: string;
}

interface IAddressInfoResponse {
	balance: string;
	transactions: any[];
}

const API_BASE = "http://jobcoin.gemini.com/passport-list/api";
const ADDRESS_API = `${API_BASE}/addresses`;
const TRANSACTIONS_API = `${API_BASE}/transactions`;

export class jobcoinAPIService {
	public async getAddressInfo(
		address: string
	): Promise<IAddressInfoResponse | undefined> {
		try {
			const response = await axios.get(`${ADDRESS_API}/${address}`);
			return response.data as IAddressInfoResponse;
		} catch (error) {
			// TODO: add alerting
		}
	}

	public async getTransactions() {
		try {
			const response = await axios.get(TRANSACTIONS_API);
			return response;
		} catch (error) {
			// TODO: add alerting
		}
	}

	public async postTransactions(transactionParams: ITransactionParams) {
		try {
			const response = await axios.post(
				TRANSACTIONS_API,
				transactionParams
			);
			return response;
		} catch (error) {
			// TODO: add alerting
		}
	}
}
