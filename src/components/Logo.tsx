import logoImgLarge from "../assets/image/JOBCOIN-full.png";
import logoImgSmall from "../assets/image/JobCoin-small.png";

interface ILogoProps {
	height: string;
	width?: string;
	showSmallLogo?: boolean;
}

export const Logo = ({ height, width = "auto", showSmallLogo }: ILogoProps) => {
	if (showSmallLogo) {
		return (
			<img
				src={logoImgSmall}
				width={width}
				height={height}
				alt="jobcoin logo small"
			/>
		);
	}
	return (
		<img
			src={logoImgLarge}
			width={width}
			height={height}
			alt="jobcoin logo large"
		/>
	);
};
