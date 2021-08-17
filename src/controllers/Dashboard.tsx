import { Nav } from "../components/Nav";
import { jobcoinAPIService } from "../services/jobcoinAPIService";

interface IDashboardProps {
	apiService: jobcoinAPIService;
	setIsAuthorized: (isAuthorized: boolean) => void;
}

export const Dashboard = ({ setIsAuthorized }: IDashboardProps) => {
	return (
		<div className="dashboards-container">
			<Nav setIsAuthorized={setIsAuthorized} />
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-4"></div>
					<div className="col-md-8"></div>
				</div>
			</div>
		</div>
	);
};
