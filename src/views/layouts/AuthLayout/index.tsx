import React, { useEffect } from "react";
import { Layout } from "antd";
import useStore from "../../../store";
import { Outlet, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import HeaderView from "./Header/HeaderView";

const AuthLayout: React.FC = observer(() => {
	const navigate = useNavigate();
	const { AUTH } = useStore();
	const { token } = AUTH;

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, [token, history]);

	return (
		<Layout className={`main__page__wrapper has__header`}>
			<HeaderView />
			<Layout.Content className="main__page__content">
				<Outlet />
			</Layout.Content>
		</Layout>
	);
});

export default AuthLayout;
