import React, { Dispatch, SetStateAction } from "react";
import { Layout } from "antd";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

interface HeaderViewProps {
	visible?: boolean;
	collapsed: boolean;
	SetCollapsed: Dispatch<SetStateAction<boolean>>;
}

const AppHeaderView: React.FC<HeaderViewProps> = ({
	visible,
	collapsed,
	SetCollapsed,
}) => {
	return !visible ? null : (
		<Layout.Header className="main__page__appheader">
			<div className="container-fluid">
				<div className="appheader__left">
					{collapsed ? (
						<AiOutlineMenuUnfold
							className="sidebar__trigger"
							size={20}
							onClick={() => SetCollapsed(!collapsed)}
						/>
					) : (
						<AiOutlineMenuFold
							className="sidebar__trigger"
							size={20}
							onClick={() => SetCollapsed(!collapsed)}
						/>
					)}
				</div>
			</div>
		</Layout.Header>
	);
};

export default AppHeaderView;
