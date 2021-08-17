import { useState } from "react";
import { Logo } from "../components/Logo";
import { SimpleInput } from "../components/SimpleInput";
import { jobcoinAPIService } from "../services/jobcoinAPIService";

interface ILoginProps {
	apiService: jobcoinAPIService;
	handleLogin: () => void;
}

export const Login = ({ apiService, handleLogin }: ILoginProps) => {
	const [inputValue, setInputValue] = useState("");

	const onLogin = async () => {
		const a = await apiService.getAddressInfo(inputValue);
		console.log("test", a);
		handleLogin();
	};
	return (
		<div className="login-page-container d-flex align-items-center flex-column">
			<Logo height={"400px"} />
			<div className="login-container p-4 shadow rounded mt-4">
				<header className="mb-4">
					<h3 className="text-center">Welcome!</h3>
					<p className="text-center">
						Sign in with your JobCoin Address
					</p>
					<hr />
				</header>
				<SimpleInput
					value={inputValue}
					setValue={setInputValue}
					inputId="login-input"
					title="JobCoin Address"
					inputType="text"
				/>
				<div className="d-flex align-items-center justify-content-end mt-3">
					<button
						type="button"
						className="btn primary-btn"
						onClick={onLogin}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};
