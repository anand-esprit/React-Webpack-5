import React, { useEffect, useState } from "react";
import { AgGridColumn } from "ag-grid-react";
import AgGridWrapper from "../../../../components/AgGridWrapper/AgGridWrapper";
// import { AppMasterListDataProps } from "../../../../store/UserStore/UserInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "antd/es/button";
import {
  faEye,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Config from "../../../../config/Config";
import useStore from "../../../../store";
import AssignToViewModal from "./AssignToViewModal";
import { CONSTANT } from "../../../../config/Constant";
// import AssignToViewModal

const ListComponent: React.FC<any> = ({
  rowData,
  getData,
  openDeleteModal,
  openEditModal,
}) => {
  const { AUTH, ACL_OFFICER_LIST_STORE } = useStore();
  const {
    setupGrid,
    ViewData,
    viewAROGroupValues,
    viewACOActionValues,
    viewAROUserValues,
    viewOSNameValues,
    viewDepartmentValues,
    viewDesignationValues,
  } = ACL_OFFICER_LIST_STORE;

  const [AssignToModal, setAssignToModal] = useState(false);

  const openAssignToModal = (props: any) => {
    const postData = {
      type: props.colDef.field,
    };

    const data = props.data;
    ViewData(data.id, postData).then(() => {
      setAssignToModal(true);
    });
  };

  const closeAssignToModal = () => {
    setAssignToModal(false);
  };

  const AssignToViewRenderer = (props: any) => {
    return (
      <>
        <Button
          type="text"
          title="View"
          className=""
          onClick={() => openAssignToModal(props)}
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

  const OSNameRenderer = (props: any) => {
    const OSName = props.data.os_names.split(",");
    return (
      <>
        {/* yes */}
        {OSName.map((item: any) => {
          return CONSTANT.PLATFORM_ARRAY.map((plt: any, index: any) => {
            return Number(item) === plt.id ? (
              <span key={index} className="osTag">
                {plt?.name}
              </span>
            ) : null;
          });
        })}
      </>
    );
    // console.log("props", props.data.os_names.split(","));
    // const OSName = props.data.os_names.split(",");
    // OSName.map((item: any) => {
    //   return CONSTANT.PLATFORM_ARRAY.map((plt: any, index: any) => {
    //     return <span key={index}>{plt?.name}</span>;
    //     // return Number(item) === plt.id ? (
    //     //   <>
    //     //     fgds
    //     //     <span key={index}>{plt?.name}</span>
    //     //   </>
    //     // ) : (
    //     //   // </div>
    //     //   <></>
    //     // );
    //     // );
    //   });
    // });
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <AssignToViewModal
        visible={AssignToModal}
        close={closeAssignToModal}
        viewAROGroupValues={viewAROGroupValues}
        viewACOActionValues={viewACOActionValues}
        viewAROUserValues={viewAROUserValues}
        viewOSNameValues={viewOSNameValues}
        viewDepartmentValues={viewDepartmentValues}
        viewDesignationValues={viewDesignationValues}
      />

      <AgGridWrapper
        rowData={rowData}
        components={{ ActionRenderer, AssignToViewRenderer }}
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
          field="aro_user"
          headerName="ARO User"
          cellRenderer={(props: any) => {
            return props.data.aro_user ? AssignToViewRenderer(props) : "N/A";
          }}
        />
        <AgGridColumn
          field="aro_group"
          headerName="ARO Group"
          cellRenderer={(props: any) => {
            return props.data.aro_group ? AssignToViewRenderer(props) : "N/A";
          }}
        />
        <AgGridColumn
          field="app_id"
          headerName="App Id"
          cellRenderer={(props: any) => {
            return props.data.app_id
              ? AUTH.appList.find((item: any) => item.id === props.data.app_id)
                  ?.officer_app_name
              : "N/A";
          }}
        />
        <AgGridColumn
          field="os_names"
          headerName="OS Name"
          cellRenderer={(props: any) => {
            return props.data.os_names ? OSNameRenderer(props) : "N/A";
          }}
        />
        <AgGridColumn
          field="department_ids"
          headerName="Department"
          cellRenderer={(props: any) => {
            return props.data.department_ids
              ? AssignToViewRenderer(props)
              : "N/A";
          }}
        />
        <AgGridColumn
          field="designation_ids"
          headerName="Designation"
          cellRenderer={(props: any) => {
            return props.data.designation_ids
              ? AssignToViewRenderer(props)
              : "N/A";
          }}
        />
        <AgGridColumn
          field="aco_ids"
          headerName="ACO Ids"
          cellRenderer={(props: any) => {
            return props.data.aco_ids ? AssignToViewRenderer(props) : "N/A";
          }}
        />
        <AgGridColumn field="desc" headerName="Description" />
        <AgGridColumn
          field="user_check"
          headerName="User Check"
          cellRenderer={(props: any) => {
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
