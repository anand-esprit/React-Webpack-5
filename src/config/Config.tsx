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
  sidebar_width: 280,
  dateFormat: "DD/MM/YYYY",
  dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
  orangeBtn: "#FFA500",
  redBtn: "#f10000",
  blueBtn: "#0F01FF",
  greenBtn: "#3cad64",
  themePrimaryBtn: "#008fd5",
  grid: {
    server: {
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
      gridOptions: {
        animateRows: true,
        pagination: true,
        paginationPageSize: 50,
        rowHeight: 40,
        headerHeight: 40,
        floatingFiltersHeight: 40,
        enableRangeSelection: true,
        cacheBlockSize: 50,
        blockLoadDebounceMillis: 500,
        rowSelection: "multiple",
        overlayNoRowsTemplate: "No Records Found.",
      },
      defaultColDef: {
        resizable: true,
        sortable: true,
        cellClass: "text-center",
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
        paginationPageSize: 50,
        rowHeight: 40,
        headerHeight: 40,
        floatingFiltersHeight: 40,
        enableRangeSelection: true,
        rowSelection: "multiple",
        overlayNoRowsTemplate: "No Records Found.",
      },
      defaultColDef: {
        resizable: true,
        sortable: true,
        cellClass: "text-center",
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
      onSortChanged: onFilterChanged,
    },
  },
};

export const USER_ROLES = [
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "Commissioner",
  },
  {
    id: 3,
    name: "Director",
  },
  {
    id: 4,
    name: "Divisional Head",
  },
  {
    id: 5,
    name: "Ward Officer",
  },
  {
    id: 6,
    name: "Civilians",
  },
  {
    id: 7,
    name: "Operator",
  },
];

export default Config;
