import React from "react";
import Logo from "../../../assets/images/civic-logo.png";
import LoginBanner from "../../../assets/images/login-image.png";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  return (
    <section className="loginSection">
      <div className="loginWrap">
        <div className="loginLogo">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="loginBanner">
            <img src={LoginBanner} alt="Banner" />
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
