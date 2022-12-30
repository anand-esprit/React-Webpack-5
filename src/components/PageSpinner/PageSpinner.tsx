import React from "react";
import { Spin } from "antd";

const PageSpinner: React.FC = () => (
	<div className={"fullscreen__spinner__wrapper"}>
		<Spin size={"large"} />
	</div>
);

export default PageSpinner;
