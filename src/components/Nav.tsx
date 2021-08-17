import { Logo } from "./Logo";

interface INavProps {
	setIsAuthorized: (isAuthorized: boolean) => void;
}

export const Nav = ({ setIsAuthorized }: INavProps) => {
	return (
		<>
			<nav className="main-nav d-flex align-items-center justify-content-between">
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
			<div className="nav-spacer"></div>
		</>
	);
};
