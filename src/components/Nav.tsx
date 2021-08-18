import { Alert, IAlertConfig } from "./Alert";
import { Logo } from "./Logo";

interface INavProps {
	setIsAuthorized: (isAuthorized: boolean) => void;
	alertConfig: IAlertConfig;
	setAlertConfig: (alertConfig: IAlertConfig) => void;
}

export const Nav = ({
	setIsAuthorized,
	alertConfig,
	setAlertConfig,
}: INavProps) => {
	return (
		<>
			<nav className="main-nav d-flex align-items-center justify-content-between w-100">
				<div className="left-content">
					<Logo height="80px" showSmallLogo={true} />
				</div>
				<div className="right-content">
					<i className="far fa-user fa-2x mr-4"></i>
					<i
						className="cursor-pointer fas fa-sign-out-alt fa-2x mr-4"
						onClick={() => setIsAuthorized(false)}
					></i>
				</div>
			</nav>
			<div className="nav-spacer position-relative"></div>
			<div className="alert-container position-absolute d-flex align-items-center justify-content-center w-100">
				<Alert
					dismissable={true}
					show={alertConfig.showAlert}
					variant={alertConfig.alertType}
					onClose={() =>
						setAlertConfig({ ...alertConfig, showAlert: false })
					}
				>
					<span className="pr-4 pl-5">
						{alertConfig.alertMessage}
					</span>
				</Alert>
			</div>

			<div className="nav-spacer "></div>
		</>
	);
};
