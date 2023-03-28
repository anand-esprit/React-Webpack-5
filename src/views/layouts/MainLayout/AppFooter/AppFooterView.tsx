import React from "react";
import { Layout } from "antd";

const AppFooterView: React.FC = () => {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      © 2019 <span>Everything Civic</span> (All right reserved)
    </Layout.Footer>
  );
};

export default AppFooterView;
