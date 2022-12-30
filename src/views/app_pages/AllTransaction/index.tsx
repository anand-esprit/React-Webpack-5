import React from "react";
// import { PageHeader } from "antd";
import { PageHeader } from '@ant-design/pro-layout';
import BreadcrumbComponent from "../../../components/BreadcrumbComponent/BreadcrumbComponent";
import { AllTransactionBreadcrumb } from "../../../config/BreadcrumbConfig";
import HeaderButtons from "./components/HeaderButtons";
import ContentBox from "../../../components/ContentBox/ContentBox";
import ListComponent from "./components/ListComponent";
import useStore from "../../../store";
import { observer } from "mobx-react-lite";

const AllTransaction: React.FC = observer(() => {
	const { ALL_TRANSACTIONS } = useStore();
	const { setupGrid } = ALL_TRANSACTIONS;
	return (
		<>
			<BreadcrumbComponent items={AllTransactionBreadcrumb.path} />
			<PageHeader
				title={AllTransactionBreadcrumb.title}
				extra={[<HeaderButtons key={1} />]}
			/>
			<ContentBox>
				<ListComponent setupGrid={setupGrid} />
			</ContentBox>
		</>
	);
});

export default AllTransaction;
