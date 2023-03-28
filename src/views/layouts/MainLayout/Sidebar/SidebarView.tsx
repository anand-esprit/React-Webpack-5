import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import LogoComponent from "../../Components/LogoComponent";
import Config from "../../../../config/Config";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../../../../store";
import MenuDefaultIcon from "../../../../assets/images/icon/menu/default.png";
import { snake_case_string } from "../../../../config/Global";
import { observer } from "mobx-react";
// import { MenuIconList } from "./MenuIcon";

interface AppSidebarViewProps {
  collapsed?: boolean;
}

const SidebarView: React.FC<AppSidebarViewProps> = observer(({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<any>([]);

  const { AUTH } = useStore();
  // console.log("AUTH.accessMenu", AUTH.accessMenu);
  // const newMenu = Object.keys(AUTH.accessMenu);

  // const tryRequire = (path: string) => {
  //   try {
  //     return require(`${path}`);
  //   } catch (err) {
  //     return null;
  //   }
  // };

  useEffect(() => {
    const tempMenu = AUTH.accessMenu?.map((item: any) => {
      const tempMainMenu = item;
      const iconName = snake_case_string(item.label);
      item.icon = (
        <img
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = MenuDefaultIcon;
          }}
          src={`/images/${iconName}.png`}
          alt="Menu Icon"
        />
      );

      if (item?.children) {
        item.children.map((i: any) => {
          const tempSubmenu = i;
          tempSubmenu.key = i.path;
          return tempSubmenu;
        });
      } else {
        tempMainMenu.key = item.path;
      }

      return tempMainMenu;
    });
    setMenu(tempMenu);
  }, [AUTH.accessMenu]);

  return (
    <Layout.Sider
      collapsed={collapsed}
      width={Config.sidebar_width}
      className="main__page__appsidebar"
    >
      <LogoComponent collapsed={collapsed} />
      <Menu
        mode="inline"
        theme="dark"
        activeKey={location.pathname}
        items={menu}
        onClick={(item) => navigate(item.key)}
      ></Menu>
    </Layout.Sider>
  );
});

export default SidebarView;
