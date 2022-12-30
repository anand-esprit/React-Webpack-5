import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

const HeaderMenuComponent: React.FC = observer(() => {
	const location = useLocation();
	const navigate = useNavigate();
	const menuItems = [
		{ key: "/", label: "Home" },
		{ key: "/about-us", label: "About Us" },
		{ key: "/blog", label: "Blog" },
		{ key: "/contact-us", label: "Contact Us" },
		// { key: "/login", label: "Login" },
		// { key: "/register", label: "Register" },
		{
			key: "auth",
			label: "Auth",
			children: [
				{ key: "/login", label: "Login" },
				{ key: "/register", label: "Register" },
			],
		},
	];

	return (
		<Layout.Sider width={500}>
			<Menu
				className="header__menu"
				mode={"horizontal"}
				activeKey={location.pathname}
				items={menuItems}
				onClick={(item) => navigate(item.key)}
			></Menu>
		</Layout.Sider>
	);
});

export default HeaderMenuComponent;
