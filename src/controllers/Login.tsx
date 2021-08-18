import { useState } from "react";
import { Logo } from "../components/Logo";
import { SimpleInput } from "../components/SimpleInput";

interface ILoginProps {
	handleLogin: (address: string) => void;
}

export const Login = ({ handleLogin }: ILoginProps) => {
	const [inputValue, setInputValue] = useState("test");

	const onLogin = () => {
		handleLogin(inputValue);
	};
	return (
		<div className="login-page-container d-flex align-items-center flex-column">
			<Logo height={"400px"} />
			<div className="login-container p-4 shadow rounded">
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
