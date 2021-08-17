import logo from "../assets/video/JobCoin.mp4";
import logoImg from "../assets/image/JobCoin-small.png";

interface ILogoProps {
	height: string;
	width?: string;
	showSmallLogo?: boolean;
}

export const Logo = ({ height, width = "auto", showSmallLogo }: ILogoProps) => {
	if (showSmallLogo) {
		return (
			<img
				src={logoImg}
				width={width}
				height={height}
				title="Your browser does not support the video tag"
				alt="jobcoin logo"
			/>
		);
	}
	return (
		<video
			width={width}
			height={height}
			autoPlay={true}
			muted={true}
			className="logo-container"
		>
			<source src={logo} type="video/mp4" />
			<source src={logo} type="video/ogg" />
			<img
				src={logoImg}
				title="Your browser does not support the video tag"
				alt="jobcoin logo"
			/>
		</video>
	);
};
