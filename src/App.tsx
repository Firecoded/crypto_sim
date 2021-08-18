import { useState } from "react";

// components
import { Dashboard } from "./controllers/Dashboard";
import { Login } from "./controllers/Login";

//servcies
import { jobcoinAPIService } from "./services/jobcoinAPIService";

//assets
import "./styles/styles.scss";

const JobCoinAPIService = new jobcoinAPIService();

const App = () => {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [jobCoinAddress, setJobCoinAddress] = useState("");

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
				apiService={JobCoinAPIService}
				setIsAuthorized={setIsAuthorized}
				jobCoinAddress={jobCoinAddress}
			/>
		</div>
	);
};

export default App;
