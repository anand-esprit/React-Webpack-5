import React from "react";
import { Layout, Menu } from "antd";
import LogoComponent from "../../Components/LogoComponent";
import Config from "../../../../config/Config";
import { useLocation, useNavigate } from "react-router-dom";

interface AppSidebarViewProps {
	collapsed?: boolean;
}

const SidebarView: React.FC<AppSidebarViewProps> = ({ collapsed }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const menuItems = [
		{ key: "/dashboard", label: "Dashboard" },
		{
			key: "User Management",
			label: "User Management",
			children: [{ key: "/user-management", label: "Users" }],
		},
		{ key: "/transaction-models", label: "Transaction Models" },
	];

	return (
		<Layout.Sider
			collapsed={collapsed}
			width={Config.sidebar_width}
			className="main__page__appsidebar"
		>
			<LogoComponent />
			<Menu
				mode="inline"
				theme="dark"
				activeKey={location.pathname}
				items={menuItems}
				onClick={(item) => navigate(item.key)}
			></Menu>
		</Layout.Sider>
	);
};

export default SidebarView;
