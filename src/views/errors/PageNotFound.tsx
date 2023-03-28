import { Button, Result, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CONSTANT } from "../../config/Constant";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section pagenotfound__section">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Space size="large">
            <Button size="large" type="primary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button size="large" type="primary">
              <Link to={CONSTANT.DASHBOARD_REDIRECT_PATH}>Back Home</Link>
            </Button>
          </Space>
        }
      />
    </section>
  );
};

export default PageNotFound;
