import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

const HeaderButtons: React.FC = () => {
	return (
		<Space>
			<Button type="primary" icon={<PlusOutlined />}>
				Create
			</Button>
		</Space>
	);
};

export default HeaderButtons;
