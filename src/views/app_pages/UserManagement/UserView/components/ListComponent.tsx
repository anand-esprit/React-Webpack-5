import React, { useEffect } from "react";
import { AgGridColumn } from "ag-grid-react";
import moment from "moment";
import AgGridWrapper from "../../../../../components/AgGridWrapper/AgGridWrapper";
import { UserListDataProps } from "../../../../../store/UserStore/UserInterface";
import Config from "../../../../../config/Config";
import DateComparator from "../../../../../utils/DateComparator";

interface ListProps {
	rowData: UserListDataProps[];
	getData: () => Promise<any>;
}

const ListComponent: React.FC<ListProps> = ({ rowData, getData }) => {
	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<AgGridWrapper rowData={rowData}>
			<AgGridColumn field="id" headerName="# ID" flex={0.5} />
			<AgGridColumn
				field="name"
				valueGetter={({ data }) => `${data.first_name} ${data.last_name}`}
			/>
			<AgGridColumn field="email" />
			<AgGridColumn field="user_role.role_name" headerName="Role" />
			<AgGridColumn
				field="last_login_at"
				headerName="Last Login"
				valueGetter={({ data }) =>
					data.last_login_at &&
					moment(data.last_login_at).format(Config.dateTimeFormat)
				}
				filter={"agDateColumnFilter"}
				filterParams={{
					comparator: DateComparator,
				}}
			/>
		</AgGridWrapper>
	);
};

export default ListComponent;
