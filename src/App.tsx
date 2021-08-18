import { useState } from "react";
import { IAlertConfig } from "./components/Alert";

// components
import { Dashboard } from "./controllers/Dashboard";
import { Login } from "./controllers/Login";

//assets
import "./styles/styles.scss";

const App = () => {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [jobCoinAddress, setJobCoinAddress] = useState("");
	const [alertConfig, setAlertConfig] = useState<IAlertConfig>({
		showAlert: false,
		alertType: "info",
		alertMessage: "",
	});

	const handleLogin = (address: string) => {
		setJobCoinAddress(address);
		setIsAuthorized(true);
	};

	if (isAuthorized === false) {
		return (
			<div className="app-container">
				<Login handleLogin={handleLogin} />
			</div>
		);
	}
	return (
		<div className="app-container">
			<Dashboard
				setIsAuthorized={setIsAuthorized}
				jobCoinAddress={jobCoinAddress}
				alertConfig={alertConfig}
				setAlertConfig={setAlertConfig}
			/>
		</div>
	);
};

export default App;
