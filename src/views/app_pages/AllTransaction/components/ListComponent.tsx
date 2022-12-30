import React from "react";
import { AgGridColumn } from "ag-grid-react";
import AgGridWrapper from "../../../../components/AgGridWrapper/AgGridWrapper";
import { GridReadyEvent } from "ag-grid-community";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";

interface ListComponentProps {
	setupGrid: (params: GridReadyEvent) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({ setupGrid }) => {
	const ActionRenderer = (params: any) => {
		console.log(params);
		return (
			<div className="action-column">
				<Button title="View Trade Transaction" type="text">
					<EyeOutlined />
				</Button>
			</div>
		);
	};

	return (
		<AgGridWrapper
			type="serverSide"
			onGridReady={setupGrid}
			frameworkComponents={{ ActionRenderer }}
		>
			<AgGridColumn
				field="id"
				headerName="# ID"
				checkboxSelection={true}
				pinned="left"
				filter="agNumberColumnFilter"
				width={120}
			/>
			<AgGridColumn
				field="exchange_ref_id"
				headerName="Exchange ID"
				width={140}
			/>
			<AgGridColumn
				field="type_field_mapping.mapping_name"
				headerName="Mapping Type"
				width={160}
			/>
			<AgGridColumn
				field="entity_name"
				headerName="Organisation / People Name"
				width={200}
			/>
			<AgGridColumn field="role_name" headerName="Role" width={130} />
			<AgGridColumn
				field="related_entity_name"
				headerName="Related Organisation / People Name"
				width={200}
			/>
			<AgGridColumn
				field="related_role_name"
				headerName="Related Role"
				width={160}
			/>
			<AgGridColumn
				headerName="Actions"
				type="actionColumn"
				sortable={false}
				filter={false}
				width={100}
			/>
		</AgGridWrapper>
	);
};

export default ListComponent;
