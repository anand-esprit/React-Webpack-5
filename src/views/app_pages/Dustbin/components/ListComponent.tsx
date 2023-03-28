import React, { useEffect } from "react";
import { AgGridColumn } from "ag-grid-react";
import AgGridWrapper from "../../../../components/AgGridWrapper/AgGridWrapper";
// import { AppMasterListDataProps } from "../../../../store/UserStore/UserInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "antd/es/button";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Config from "../../../../config/Config";
import useStore from "../../../../store";
import { Switch } from "antd";
import { toJS } from "mobx";
import moment from "moment";

const ListComponent: React.FC<any> = ({
  rowData,
  getData,
  openDeleteModal,
  openEditModal,
}) => {
  const { AUTH, DUSTBIN_STORE } = useStore();
  const { ChangeStatus, setupGrid } = DUSTBIN_STORE;

  const ActionRenderer = (props: any) => {
    return (
      <div className="action-column">
        {AUTH.checkPermission("edit") && (
          <Button
            type="text"
            title={"Edit"}
            className="editIcon"
            onClick={() => {
              openEditModal(toJS(props.data));
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

  const SwitchRenderer = (props: any) => {
    return (
      <div>
        <Switch
          defaultChecked={props.data?.is_active == 1}
          onChange={(value) => handleSwitch(value, props.data.id)}
        />
      </div>
    );
  };

  const handleSwitch = (data: any, id: number) => {
    ChangeStatus(data, id)
      .then(() => {
        return;
      })
      .finally(() => {
        return;
      });
  };

  return (
    <AgGridWrapper
      rowData={rowData}
      components={{ ActionRenderer, SwitchRenderer }}
      onGridReady={setupGrid}
    >
      <AgGridColumn
        field="id"
        headerName="# ID"
        pinned="left"
        width={100}
        minWidth={100}
      />
      <AgGridColumn field="name" headerName="Name" />
      <AgGridColumn field="ward_id" headerName="Ward Id" />
      <AgGridColumn
        field="created_at"
        headerName="Created"
        valueGetter={({data})=>moment(toJS(data.created_at)).format('DD/MM/YYYY')}
      /> 
      <AgGridColumn
      field="updated_at"
      headerName="Updated"
      valueGetter={({data})=>moment(toJS(data.updated_at)).format('DD/MM/YYYY')}
    />
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
  );
};

export default ListComponent;
