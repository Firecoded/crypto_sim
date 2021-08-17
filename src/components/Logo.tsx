import logo from "../assets/video/JobCoin.mp4";

export const Logo = () => {
	return (
		<video
			width="auto"
			height="400"
			autoPlay={true}
			muted={true}
			className="logo-container"
		>
			<source src={logo} type="video/mp4" />
			<source src={logo} type="video/ogg" />
			Your browser does not support the video tag.
		</video>
	);
};
