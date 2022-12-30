import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import {
	BreadcrumbComponentItemTypes,
	BreadcrumbComponentProps,
} from "../../config/InterfacesAndTypes";

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
	return (
		<Breadcrumb className="pt-gutter ph-gutter">
			{items?.map((item: BreadcrumbComponentItemTypes, index: number) => (
				<Breadcrumb.Item key={index}>
					{item.link ? <Link to={item.link}>{item.name}</Link> : item.name}
				</Breadcrumb.Item>
			))}
		</Breadcrumb>
	);
};

export default BreadcrumbComponent;
