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
import AROGroupComponent from "./AROGroupComponent";

const ListComponent: React.FC<any> = ({
  rowData,
  getData,
  openDeleteModal,
  openEditModal,
}) => {
  const { AUTH, ACL_LIST_STORE } = useStore();
  const {
    setupGrid,
    ViewData,
    viewAROGroupValues,
    viewACOActionValues,
    viewAROUserValues,
  } = ACL_LIST_STORE;
  const [AROGroupModal, setAROGroupModal] = useState(false);

  const openAROGroupModal = (props: any) => {
    const postData = {
      type: props.colDef.field,
    };

    const data = props.data;
    ViewData(data.id, postData).then(() => {
      setAROGroupModal(true);
    });
  };

  const closeAROGroupModal = () => {
    setAROGroupModal(false);
  };

  const AROViewRenderer = (props: any) => {
    return (
      <>
        <Button
          type="text"
          title="View"
          className=""
          onClick={() => openAROGroupModal(props)}
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

  return (
    <>
      <AROGroupComponent
        visible={AROGroupModal}
        close={closeAROGroupModal}
        viewAROGroupValues={viewAROGroupValues}
        viewACOActionValues={viewACOActionValues}
        viewAROUserValues={viewAROUserValues}
      />
      <AgGridWrapper
        rowData={rowData}
        components={{
          ActionRenderer,
          AROViewRenderer,
          // AROUserRenderer,
          // AROACOActionRenderer,
          // ARORoleRenderer,
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
        <AgGridColumn
          field="aro_group"
          headerName="ARO Group"
          cellRenderer={(props: any) => {
            return props.data.aro_group ? AROViewRenderer(props) : "N/A";
          }}
        />
        {/* <AgGridColumn field="aro_group" headerName="ARO Group" /> */}
        <AgGridColumn
          field="aro_user"
          headerName="ARO User"
          cellRenderer={(props: any) => {
            return props.data.aro_user ? AROViewRenderer(props) : "N/A";
          }}

          // cellRenderer={AROUserRenderer}
        />
        <AgGridColumn
          field="aco_ids"
          headerName="ACO Ids"
          cellRenderer={(props: any) => {
            return props.data.aco_ids ? AROViewRenderer(props) : "N/A";
          }}
          // cellRenderer={AROACOActionRenderer}
        />
        <AgGridColumn
          field="user_check"
          headerName="User Check"
          cellRenderer={(props: any) => {
            // console.log("props", props);
            return props.data.user_check ? "Yes" : "No";
          }}
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
