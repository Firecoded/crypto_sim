import React from "react";
// If you want the alert to be dismissable and keep the fade animation, then always render and toggle the view with show/ onclose view logic
interface AlertProps {
	variant: AlertType;
	show: boolean;
	dismissable?: boolean;
	onClose?: () => void;
	children: React.ReactChild | React.ReactChild[];
}

export interface IAlertConfig {
	showAlert: boolean;
	alertType: AlertType;
	alertMessage: string;
}

export type AlertType = "success" | "info" | "caution" | "warning";

const DEFAULT_ALERT_VARIANT = "info";

export const Alert = (props: AlertProps) => {
	const alertClassName = `alert-${props.variant || DEFAULT_ALERT_VARIANT}`;
	const dismissElement = props.dismissable ? (
		<button type="button" className="close" aria-label="Close">
			<span
				aria-hidden="true"
				onClick={props.onClose}
				className="cursor-pointer"
			>
				&times;
			</span>
		</button>
	) : (
		""
	);
	return (
		<div
			className={`alert fade ${props.show ? "show" : ""}
                ${props.dismissable ? "alert-dismissible" : ""}
                ${alertClassName}
            `}
			role="alert"
		>
			{props.children}
			{dismissElement}
		</div>
	);
};
