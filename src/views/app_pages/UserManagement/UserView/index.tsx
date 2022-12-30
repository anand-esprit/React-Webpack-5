// import { PageHeader } from "antd";
import { PageHeader } from '@ant-design/pro-layout';
import { observer } from "mobx-react";
import React from "react";
import BreadcrumbComponent from "../../../../components/BreadcrumbComponent/BreadcrumbComponent";
import ContentBox from "../../../../components/ContentBox/ContentBox";
import { UserBreadcrumb } from "../../../../config/BreadcrumbConfig";
import useStore from "../../../../store";
import HeaderButtons from "./components/HeaderButtons";
import ListComponent from "./components/ListComponent";

const UserView: React.FC = observer(() => {
	const { USER } = useStore();
	const { list_data, fetchList } = USER;

	return (
		<>
			<BreadcrumbComponent items={UserBreadcrumb.path} />
			<PageHeader
				title={UserBreadcrumb.title}
				extra={[<HeaderButtons key={1} />]}
			/>
			<ContentBox>
				<ListComponent rowData={list_data} getData={fetchList} />
			</ContentBox>
		</>
	);
});

export default UserView;
