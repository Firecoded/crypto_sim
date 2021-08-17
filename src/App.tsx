import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "./controllers/Login";

import "./styles/styles.scss";

function App() {
	const [isAuthorized, setIsAuthorized] = useState(false);
	if (isAuthorized === false) {
		return (
			<div className="app-container">
				<Login />
			</div>
		);
	}
	return (
		<div className="app-container">
			<Router>
				<Switch>
					<Route path="/" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
