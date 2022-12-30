import { AgGridReactProps, AgReactUiProps } from "ag-grid-react";


interface ConfigProps {
	[key: string]: any;
	grid: {
		local: AgGridReactProps | AgReactUiProps;
		server: AgGridReactProps | AgReactUiProps;
	};
}

export const onFilterChanged = (params: any) => {
	const agGrid = params;
	if (agGrid && agGrid.api.getModel().getRowCount() === 0) {
		agGrid.api.showNoRowsOverlay();
	}
	if (agGrid && agGrid.api.getModel().getRowCount() > 0) {
		agGrid.api.hideOverlay();
	}
};

const Config: ConfigProps = {
	gutter: 24,
	sidebar_width: 200,
	dateFormat: "DD/MM/YYYY",
	dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
	grid: {
		server: {
			rowModelType: "serverSide",
			serverSideStoreType: 'partial',
			gridOptions: {
				animateRows: true,
				pagination: true,
				paginationPageSize: 10,
				rowHeight: 36,
				enableRangeSelection: true,
				cacheBlockSize: 10,
				blockLoadDebounceMillis: 500,
				rowSelection: "multiple",
				overlayNoRowsTemplate: "No Records Found.",
			},
			defaultColDef: {
				resizable: true,
				sortable: true,
				filter: "agTextColumnFilter",
				filterParams: {
					suppressAndOrCondition: true,
				},
				floatingFilter: true,
				flex: 1,
				minWidth: 200,
			},
			columnTypes: {
				actionColumn: {
					cellRenderer: "ActionRenderer",
				},
			},
		},
		local: {
			gridOptions: {
				animateRows: true,
				pagination: true,
				paginationPageSize: 500,
				rowHeight: 36,
				enableRangeSelection: true,
				rowSelection: "multiple",
				overlayNoRowsTemplate: "No Records Found.",
			},
			defaultColDef: {
				resizable: true,
				sortable: true,
				filter: "agTextColumnFilter",
				filterParams: {
					suppressAndOrCondition: true,
				},
				floatingFilter: true,
				flex: 1,
				minWidth: 200,
			},
			columnTypes: {
				actionColumn: {
					cellRenderer: "ActionRenderer",
				},
			},
			onFilterChanged: onFilterChanged,
			onSortChanged: onFilterChanged
		},
	},
};

export default Config;
