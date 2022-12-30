import { Card, Layout } from "antd";
import React from "react";

export interface ContentBoxProps {
	children?: any;
	hasBox?: boolean;
}

const ContentBox: React.FC<ContentBoxProps> = ({ children, hasBox }) => {
	return (
		<Layout.Content className="app__container">
			{hasBox ? (
				<Card className="app__container__card">{children}</Card>
			) : (
				children
			)}
		</Layout.Content>
	);
};

export default ContentBox;
