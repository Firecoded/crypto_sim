import {
	LineChart as Chart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { Loading } from "./Loading";

interface ILineChartProps<D> {
	data: D[];
	xKey: keyof D;
	yKey: keyof D;
	isLoading: boolean;
	height: number;
	noDataMessage: string;
}

export const LineChart = <D,>(props: ILineChartProps<D>) => {
	if (props.isLoading) {
		return (
			<div
				className="d-flex align-items-center justify-content-center"
				style={{ height: props.height }}
			>
				<Loading />
			</div>
		);
	}
	if (props.data.length < 1) {
		return (
			<div
				className="d-flex align-items-center justify-content-center my-5"
				style={{ height: props.height }}
			>
				<h6 className="text-muted">{props.noDataMessage}</h6>
			</div>
		);
	}
	const CustomTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length && payload[0].payload.toolTip) {
			return payload[0].payload.toolTip;
		}

		return null;
	};

	const renderLineChart = () => (
		<Chart
			data={props.data}
			margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
		>
			<Line
				type="monotone"
				dataKey={props.xKey as string}
				stroke="#8884d8"
			/>
			<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			<XAxis dataKey={props.yKey as string} />
			<YAxis />
			<Tooltip content={<CustomTooltip />} />
		</Chart>
	);

	return (
		<ResponsiveContainer width="97%" height={props.height}>
			{renderLineChart()}
		</ResponsiveContainer>
	);
};
