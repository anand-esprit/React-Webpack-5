import { Button, Result, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
	const navigate = useNavigate();

	return (
		<section className="section unauthorized__section">
			<Result
				status="403"
				title="403"
				subTitle="Sorry, you are not authorized to access this page."
				extra={
					<Space size="large">
						<Button
							size="large"
							type="primary"
							onClick={() => navigate(-1)}
						>
							Go Back
						</Button>
						<Button size="large" type="primary">
							<Link to="/">Bact Home</Link>
						</Button>
					</Space>
				}
			/>
		</section>
	);
};

export default Unauthorized;
