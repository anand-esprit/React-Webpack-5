import React, { useEffect, useState } from "react";
import { AgGridColumn } from "ag-grid-react";
import AgGridWrapper from "../../../../components/AgGridWrapper/AgGridWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "antd/es/button";
import {
  faEye,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Config from "../../../../config/Config";
import useStore from "../../../../store";
import ListDataViewComponent from "./ListDataViewModal";
import { Switch } from "antd";
import { Link } from "react-router-dom";

const ListComponent: React.FC<any> = ({
  rowData,
  getData,
  openDeleteModal,
  openEditModal,
}) => {
  const { AUTH, CATEGORY_STORE } = useStore();
  const { setupGrid, ViewData, ChangeStatus, viewRoleValues } = CATEGORY_STORE;
  const [roleViewModal, setRoleViewModal] = useState(false);

  const openRoleModal = (props: any) => {
    const postData = {
      type: props.colDef.field,
    };

    const data = props.data;
    ViewData(data.id, postData).then(() => {
      setRoleViewModal(true);
    });
  };

  const closeRoleViewModal = () => {
    setRoleViewModal(false);
  };

  const RoleViewRenderer = (props: any) => {
    return (
      <>
        <Button
          type="text"
          title="View"
          className=""
          onClick={() => openRoleModal(props)}
        >
          <FontAwesomeIcon icon={faEye} color={Config.blueBtn} />
        </Button>
      </>
    );
  };

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
    <>
      <ListDataViewComponent
        visible={roleViewModal}
        close={closeRoleViewModal}
        viewRoleValues={viewRoleValues}
      />
      <AgGridWrapper
        rowData={rowData}
        components={{
          ActionRenderer,
          RoleViewRenderer,
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
        <AgGridColumn field="name" headerName="Name" />
        <AgGridColumn
          field="user_role_ids"
          headerName="User Role"
          cellRenderer={(props: any) => {
            return props.data.user_role_ids ? RoleViewRenderer(props) : "N/A";
          }}
        />
        <AgGridColumn
          field="sub_category"
          headerName="Sub Category"
          cellRenderer={(props: any) => {
            return props.data ? (
              <Link to={`/subcategorycontroller/${props.data.id}`}>
                View SubCategory
              </Link>
            ) : (
              "N/A"
            );
          }}
        />
        <AgGridColumn field="sort_order" headerName="Sort Order" />
        <AgGridColumn
          field="is_active"
          headerName="Active"
          cellRenderer={SwitchRenderer}
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
    </>
  );
};

export default ListComponent;
