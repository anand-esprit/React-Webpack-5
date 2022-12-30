import React from "react";
import { useRoutes } from "react-router-dom";
import AuthLayout from "../views/layouts/AuthLayout";
import MainLayout from "../views/layouts/MainLayout";
const Login = React.lazy(() => import("../views/app_pages/auth/Login"));
const Register = React.lazy(() => import("../views/app_pages/auth/Register"));
const Dashboard = React.lazy(() => import("../views/app_pages/Dashboard"));
const UserView = React.lazy(
	() => import("../views/app_pages/UserManagement/UserView")
);
const PageNotFound = React.lazy(() => import("../views/errors/PageNotFound"));
const Unauthorized = React.lazy(() => import("../views/errors/Unauthorized"));
const HomePage = React.lazy(() => import("../views/front_pages/HomePage"));
const AllTransaction = React.lazy(
	() => import("../views/app_pages/AllTransaction")
);

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
				element: <HomePage />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/unauthorized",
				element: <Unauthorized />,
			},
			{
				path: "*",
				element: <PageNotFound />,
			},
		],
	},
	{
		element: <MainLayout />,
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/user-management",
				element: <UserView />,
			},
			{
				path: "/transaction-models", // for server side grid example
				element: <AllTransaction />,
			},
		],
	},
];
