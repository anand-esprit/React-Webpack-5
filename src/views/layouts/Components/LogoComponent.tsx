import React from "react";
import LOGO_IMAGE from "../../../assets/images/logo.png";

const LogoComponent: React.FC = () => {
	return (
		<div className="logo__wrapper">
			<img src={LOGO_IMAGE} alt="LOGO" />
			<span>REACT APP</span>
		</div>
	);
};

export default LogoComponent;
