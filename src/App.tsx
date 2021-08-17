import { useState } from "react";

// components
import { Dashboard } from "./controllers/Dashboard";
import { Login } from "./controllers/Login";

//servcies
import { jobcoinAPIService } from "./services/jobcoinAPIService";

//assets
import "./styles/styles.scss";

const JobCoinAPIService = new jobcoinAPIService();

function App() {
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [userDetails, setUserDetails] = useState({});

	const handleLogin = () => {
		JobCoinAPIService.getAddressInfo("");
		setIsAuthorized(true);
	};
	if (isAuthorized === false) {
		return (
			<div className="app-container">
				<Login
					apiService={JobCoinAPIService}
					handleLogin={handleLogin}
				/>
			</div>
		);
	}
	return (
		<div className="app-container">
			<Dashboard
				apiService={JobCoinAPIService}
				setIsAuthorized={setIsAuthorized}
			/>
		</div>
	);
}

export default App;
