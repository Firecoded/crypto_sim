import { useState } from "react";
import { Logo } from "../components/Logo";
import { SimpleInput } from "../components/SimpleInput";

export const Login = () => {
	const [inputValue, setInputValue] = useState("");
	return (
		<div className="login-page-container d-flex align-items-center flex-column">
			<Logo />
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
					<button type="button" className="btn primary-btn">
						Login
					</button>
				</div>
			</div>
		</div>
	);
};
