import React, { useEffect } from "react";
import { AgGridColumn } from "ag-grid-react";
import AgGridWrapper from "../../../../components/AgGridWrapper/AgGridWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "antd/es/button";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Config from "../../../../config/Config";
import useStore from "../../../../store";

const ListComponent: React.FC<any> = ({
  rowData,
  getData,
  openDeleteModal,
  openEditModal,
}) => {
  const { AUTH, CHECKLIST_STORE } = useStore();
  const { setupGrid } = CHECKLIST_STORE;

  const ActionRenderer = (props: any) => {
    return (
      <div className="action-column">
        {AUTH.checkPermission("edit") && (
          <Button
            type="text"
            title={"Edit"}
            className="editIcon"
            onClick={() => {
              openEditModal(props.data);
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} color={Config.orangeBtn} />
          </Button>
        )}

        {AUTH.checkPermission("destroy") && (
          <Button
            type="text"
            title={"Delete"}
            className="deleteIcon"
            onClick={() => {
              openDeleteModal(props.data);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} color={Config.redBtn} />
          </Button>
        )}
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <AgGridWrapper
        rowData={rowData}
        components={{
          ActionRenderer,
        }}
        onGridReady={setupGrid}
      >
        <AgGridColumn
          field="id"
          headerName="# ID"
          pinned="left"
          width={100}
          minWidth={100}
        />
        <AgGridColumn field="inspection_area.name" headerName="Checklist for" />
        <AgGridColumn
          field="checklist_category.name"
          headerName="Checklist Category"
        />
        <AgGridColumn field="title" headerName="Title" />
        <AgGridColumn field="sort_order" headerName="Sort Order" />
        <AgGridColumn
          headerName="Actions"
          type="actionColumn"
          sortable={false}
          filter={false}
          width={120}
          minWidth={120}
          pinned="right"
        />
      </AgGridWrapper>
    </>
  );
};

export default ListComponent;
