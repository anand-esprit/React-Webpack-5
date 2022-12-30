import { Col, Row } from "antd";
import React from "react";
import HeroImage from "../../../assets/images/logo.png";

const HomePage: React.FC = () => {
	return (
		<section className="section hero__section">
			<div className="container">
				<div className="hero__section__content">
					<Row className="content_wrapper">
						<Col span={12}>
							<h1 className="section__big__title">React Structure</h1>
							<h4 className="section__subtitle">
								A lightweight and modular front-end framework for developing
								fast and powerful React Application.
							</h4>
						</Col>
						<Col span={12} className="text-center">
							<img
								className="hero__section__img"
								src={HeroImage}
								alt="Hero Section Image"
							/>
						</Col>
					</Row>
				</div>
			</div>
		</section>
	);
};

export default HomePage;
