import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import useStore from "../../../store";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import SidebarView from "./Sidebar/SidebarView";
import AppHeaderView from "./AppHeader/AppHeaderView";


const MainLayout: React.FC = observer(() => {
		const [collapsed, SetCollapsed] = useState<boolean>(false);
		const navigate = useNavigate();
		const { AUTH } = useStore();
		const { token } = AUTH;

		useEffect(() => {
			if (!token) {
				navigate("/login");
			}
		}, [token, history]);

		return (
			<Layout className={`main__page__wrapper has__appsidebar`}>
				<SidebarView collapsed={collapsed}></SidebarView>
				<Layout.Content className="main__page__content">
					<AppHeaderView collapsed={collapsed} SetCollapsed={SetCollapsed} />
					<Layout.Content className="main__app__content">
						<Outlet />
					</Layout.Content>
				</Layout.Content>
			</Layout>
		);
	}
);

export default MainLayout;
