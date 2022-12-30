import React from "react";
import HeaderLogoComponent from "../../Components/LogoComponent";
import HeaderMenuComponent from "../../Components/HeaderMenuComponent";
import { Header } from "antd/lib/layout/layout";

const HeaderView: React.FC = () => {
	return (
		<Header className="main__page__header">
			<div className="container">
				<HeaderLogoComponent />
				<HeaderMenuComponent />
			</div>
		</Header>
	);
};

export default HeaderView;
