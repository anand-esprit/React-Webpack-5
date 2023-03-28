import React from "react";
import LOGO_IMAGE from "../../../assets/images/civic-logo.png";
import CollapseLogo from "../../../assets/images/collapsed-logo.png";

const LogoComponent: React.FC<any> = ({ collapsed }) => {
  return (
    <div className="logo__wrapper">
      {collapsed ? (
        <img src={CollapseLogo} alt="LOGO" />
      ) : (
        <img src={LOGO_IMAGE} alt="LOGO" />
      )}
    </div>
  );
};

export default LogoComponent;
