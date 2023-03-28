import React from "react";
import { Layout } from "antd";
import useStore from "../../../store";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react";
// import HeaderView from "./Header/HeaderView";

const AuthLayout: React.FC = observer(() => {
  // const navigate = useNavigate();
  const { AUTH } = useStore();
  AUTH.customRedirect("", 1);
  // const { token } = AUTH;

  // useEffect(() => {
  //   AUTH.customRedirect("",1);
  // }, []);

  return (
    <Layout className={`main__page__wrapper has__header`}>
      {/* <HeaderView /> */}
      <Layout.Content className="main__page__content">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
});

export default AuthLayout;
