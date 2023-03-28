import React, { useState } from "react";
import { Button, Form } from "antd";
import { LoginRequest } from "../../../requests/AuthRequest";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store";
import { ErrorProps } from "../../../store/RootStore/RootInterface";
import { FormBox, InputBox } from "../../../components/AntdAddons";
import LoginBG from "../../../assets/images/login-pattern.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { CONSTANT } from "../../../config/Constant";

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState<boolean>(false);
  const navigate = useNavigate();
  const { AUTH, ROOT } = useStore();
  const { doLogin } = AUTH;
  const { assignErrorToInput } = ROOT;

  const handleSubmit = (data: any) => {
    setSaving(true);

    doLogin(data)
      .then(() => {
        navigate(CONSTANT.DASHBOARD_REDIRECT_PATH);
      })
      .catch((e: ErrorProps) => {
        assignErrorToInput(form, e?.data.NOTIFICATION);
        setSaving(false);
      })
      .finally(() => setSaving(false));
  };

  return (
    <div className="loginForm" style={{ backgroundImage: `url(${LoginBG})` }}>
      {/* <div className="loginBG"> */}
      {/* <img src={LoginBG} className="loginBG" /> */}
      {/* </div> */}
      <div className="loginFormWrap">
        <div className="formTitle">
          <h2>Welcome to Civic</h2>
        </div>
        <FormBox form={form} onFinish={handleSubmit}>
          <InputBox.Text
            name="email"
            label="Email ID"
            placeholder="example@domain.com"
            rules={LoginRequest.email}
            suffix={<FontAwesomeIcon icon={faAt} />}
          />
          <InputBox.Password
            name="password"
            label="Password"
            placeholder="xxxxxxx"
            rules={LoginRequest.password}
          />
          <div className="text-center">
            <Button loading={saving} type="primary" htmlType="submit">
              Login
            </Button>
          </div>
          {/* <Divider />
            <div className="text-center">
              <Space>
                {`Don't have an account?`}
                <Link to="/register">
                  <b>Register Now</b>
                </Link>
              </Space>
            </div> */}
        </FormBox>
      </div>
    </div>
  );
};

export default LoginForm;
