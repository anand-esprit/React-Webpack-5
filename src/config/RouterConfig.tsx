import React from "react";
import { useRoutes } from "react-router-dom";
import { CONSTANT } from "./Constant";
const Login = React.lazy(() => import("../views/app_pages/auth/Login"));
const Dashboard = React.lazy(() => import("../views/app_pages/Dashboard"));
const PageNotFound = React.lazy(() => import("../views/errors/PageNotFound"));
// const Unauthorized = React.lazy(() => import("../views/errors/Unauthorized"));
const AppMaster = React.lazy(() => import("../views/app_pages/AppMaster"));
const AuthLayout = React.lazy(() => import("../views/layouts/AuthLayout"));
const MainLayout = React.lazy(() => import("../views/layouts/MainLayout"));

export default function Router() {
  const element = useRoutes(RouterConfig);
  return element;
}

export const RouterConfig = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/unauthorized",
      //   element: <Unauthorized />,
      // },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: CONSTANT.DASHBOARD_REDIRECT_PATH,
        element: <Dashboard />,
      },
      {
        path: "/appmastercontroller",
        element: <AppMaster />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
