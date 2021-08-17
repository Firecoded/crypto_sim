interface ISimpleInputProps {
	value: string;
	setValue: (value: string) => void;
	inputId: string;
	title?: string;
	inputType?: string;
	placeHolder?: string;
}

export const SimpleInput = ({
	value,
	setValue,
	title,
	inputType = "test",
	placeHolder,
	inputId,
}: ISimpleInputProps) => {
	return (
		<>
			{title ? <label htmlFor={inputId}>{title}</label> : ""}
			<input
				type={inputType}
				className="form-control"
				placeholder={placeHolder}
				aria-label={inputId}
				aria-describedby={title}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			></input>
		</>
	);
};
