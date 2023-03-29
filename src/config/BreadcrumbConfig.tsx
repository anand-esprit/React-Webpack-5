import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { BreadcrumbConfigProps } from "./InterfacesAndTypes";
import { CONSTANT } from "./Constant";

const defaultBreadcrumbPath = [
  { name: <HomeOutlined />, link: CONSTANT.DASHBOARD_REDIRECT_PATH },
];

export const AppMasterBreadcrumb: BreadcrumbConfigProps = {
  title: "App Master",
  path: [
    ...defaultBreadcrumbPath,
    { name: "AppMaster", link: "/appmastercontroller" },
  ],
};