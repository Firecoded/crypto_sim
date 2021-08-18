import { SimpleInput } from "./SimpleInput";

interface ISendCoinWidgetProps {
	destAddressValue: string;
	setDestAddressValue: (address: string) => void;
	sendAmountValue: string;
	setSendAmountValue: (address: string) => void;
	onSend: () => void;
}

export const SendCoinWidget = ({
	destAddressValue,
	setDestAddressValue,
	sendAmountValue,
	setSendAmountValue,
	onSend,
}: ISendCoinWidgetProps) => {
	return (
		<div className="send-coin-widget d-flex align-items-center flex-column p-4 rounded shadow mb-4">
			<h3 className="">Send JobCoin</h3>
			<div className="w-100">
				<SimpleInput
					value={destAddressValue}
					setValue={setDestAddressValue}
					inputId="destination-input"
					title="Destination Address"
					inputType="text"
				/>
				<SimpleInput
					value={sendAmountValue}
					setValue={setSendAmountValue}
					inputId="amount-input"
					title="Amount to Send"
					inputType="text"
				/>
			</div>
			<div className="d-flex align-items-center justify-content-end mt-3">
				<button
					type="button"
					className="btn primary-btn"
					onClick={onSend}
				>
					Send JobCoins
				</button>
			</div>
		</div>
	);
};
