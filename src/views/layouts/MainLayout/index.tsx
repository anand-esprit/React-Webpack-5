import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import useStore from "../../../store";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import SidebarView from "./Sidebar/SidebarView";
import AppHeaderView from "./AppHeader/AppHeaderView";
import AppFooterView from "./AppFooter/AppFooterView";
import Unauthorized from "../../errors/Unauthorized";

const MainLayout: React.FC = observer(() => {
  const [collapsed, SetCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const { AUTH } = useStore();
  let isUnauthorise = AUTH.isUnauthorized();
  // const { token } = AUTH;
  // AUTH.customRedirect("", 1);
  // AUTH.getPermission();

  // AUTH.customRedirect("", 1);

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   } else {
  //     AUTH.getPermission();
  //   }
  // }, [token, navigate]);
  // useEffect(() => {
  //   AUTH.customRedirect("",1);
  // }, [navigate]);

  useEffect(() => {
    AUTH.getPermission();
    isUnauthorise = AUTH.isUnauthorized();
  }, [navigate, isUnauthorise]);

  return (
    <Layout className={`main__page__wrapper has__appsidebar`}>
      <SidebarView collapsed={collapsed}></SidebarView>
      <Layout className="site-layout">
        <AppHeaderView collapsed={collapsed} SetCollapsed={SetCollapsed} />
        <Layout.Content className="main__app__content">
          {isUnauthorise ? <Unauthorized /> : <Outlet />}
        </Layout.Content>
        <AppFooterView />
      </Layout>
    </Layout>
  );
});

export default MainLayout;
