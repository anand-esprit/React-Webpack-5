import React, { useEffect, useState } from "react";
import { AgGridColumn } from "ag-grid-react";
import AgGridWrapper from "../../../../components/AgGridWrapper/AgGridWrapper";
// import { AppMasterListDataProps } from "../../../../store/UserStore/UserInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "antd/es/button";
import {
  faLocationDot,
  faPencilAlt,
  faToggleOff,
  faToggleOn,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Config from "../../../../config/Config";
import useStore from "../../../../store";
import MapComponent from "./MapComponent";
import { loadMapApi } from "../../../../utils/GoogleMapsUtils";
import ModeratorComponent from "./ModeratorComponent";
import StatusComponent from "./StatusComponent";

const ListComponent: React.FC<any> = ({
  rowData,
  // getData,
  openDeleteModal,
  openEditModal,
}) => {
  const { AUTH, APP_MASTER_STORE } = useStore();
  const { user } = AUTH;
  const { setupGrid } = APP_MASTER_STORE;

  const [mapModal, setMapModal] = useState<boolean>(false);
  const [moderatorModal, setModeratorModal] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [statusData, setStatusData] = useState<boolean>(false);
  const [moderatorData, setModeratorData] = useState<any>();
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  const [hasPolygonCord, setHasPolygonCord] = useState<any>();

  const closeMapModal = () => {
    setMapModal(false);
  };

  const openMapModal = (data: any) => {
    setHasPolygonCord(JSON.parse(data.geo_area_json).coordinates[0]);
    setMapModal(true);
  };

  const closeModeratorModal = () => {
    setModeratorModal(false);
  };

  const openModeratorModal = (data: any) => {
    console.log("moderatorData", data);
    setModeratorData(data);
    setModeratorModal(true);
  };

  const closeStatusModal = () => {
    setStatusModal(false);
  };

  const openStatusModal = (data: any) => {
    console.log("data", data);
    setStatusData(data);
    setStatusModal(true);
  };

  const manageGoogleMapScript = () => {
    const googleMapScript = loadMapApi();
    if (googleMapScript) {
      googleMapScript.addEventListener("load", function () {
        setMapScriptLoaded(true);
      });
    } else {
      setMapScriptLoaded(true);
    }
  };

  useEffect(() => {
    manageGoogleMapScript();
  }, []);

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

        {user.allow_app === null && AUTH.checkPermission("destroy") && (
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

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  const GeoAreaMapRenderer = (props: any) => {
    return (
      <>
        {props.data.geo_area_json ? (
          <Button
            type="text"
            title={"View"}
            className=""
            onClick={() => openMapModal(props.data)}
          >
            {/* <FontAwesomeIcon icon={faEye} color={Config.blueBtn} /> */}
            <FontAwesomeIcon icon={faLocationDot} color={Config.greenBtn} />
          </Button>
        ) : (
          "N/A"
        )}
      </>
    );
  };

  const ModeratorRenderer = (props: any) => {
    return (
      <>
        {props.data.moderators ? (
          <Button
            type="text"
            title={"View"}
            className=""
            onClick={() => openModeratorModal(props.data)}
          >
            <FontAwesomeIcon icon={faUser} color={Config.blueBtn} />
          </Button>
        ) : (
          "N/A"
        )}
      </>
    );
  };

  // const SwitchRenderer = (props: any) => {
  //   return (
  //     <div>
  //       <Switch
  //         defaultChecked={props.data?.is_active == 1}
  //         onChange={(value) => handleSwitch(value, props.data.id)}
  //       />
  //     </div>
  //   );
  // };

  // const handleSwitch = (data: any, id: number) => {
  //   ChangeStatus(data, id)
  //     .then(() => {
  //       return;
  //     })
  //     .finally(() => {
  //       return;
  //     });
  // };

  const statusRenderer = (props: any) => {
    return (
      <>
        {props.data.is_active ? (
          <Button
            type="text"
            className=""
            onClick={() => openStatusModal(props.data)}
          >
            <FontAwesomeIcon
              icon={faToggleOn}
              color={Config.themePrimaryBtn}
              style={{ fontSize: "24px" }}
            />
          </Button>
        ) : (
          <Button
            type="text"
            className=""
            onClick={() => openStatusModal(props.data)}
          >
            <FontAwesomeIcon
              icon={faToggleOff}
              color={Config.themePrimaryBtn}
              style={{ fontSize: "24px" }}
            />
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <ModeratorComponent
        visible={moderatorModal}
        close={closeModeratorModal}
        // addModerator={addModerator}
        viewValues={moderatorData}
        type={"view"}
      />

      <StatusComponent
        visible={statusModal}
        close={closeStatusModal}
        // addModerator={addModerator}
        viewValues={statusData}
        // type={"view"}
      />

      {mapModal && (
        <MapComponent
          visible={mapModal}
          close={closeMapModal}
          mapScriptLoaded={mapScriptLoaded}
          type={"view"}
          hasPolygonCord={hasPolygonCord}
        />
      )}

      <AgGridWrapper
        rowData={rowData}
        components={{ ActionRenderer, statusRenderer }}
        onGridReady={setupGrid}
      >
        <AgGridColumn
          field="id"
          headerName="# ID"
          pinned="left"
          width={100}
          minWidth={100}
        />
        <AgGridColumn field="app_name" headerName="App Name" />
        {/* <AgGridColumn field="logo_url" headerName="Logo" /> */}
        <AgGridColumn
          field="officer_app_name"
          headerName="Officer App Name"
          cellRenderer={(props: any) => {
            return props.data.officer_app_name
              ? props.data.officer_app_name
              : "N/A";
          }}
        />
        <AgGridColumn
          field="citizen_app_name"
          headerName="Citizen App Name"
          cellRenderer={(props: any) => {
            return props.data.citizen_app_name
              ? props.data.citizen_app_name
              : "N/A";
          }}
        />
        <AgGridColumn
          field="maintainance_mode"
          headerName="Maintainance Mode"
          cellRenderer={(props: any) => {
            return props.data.maintainance_mode ? "Yes" : "NO";
          }}
        />
        <AgGridColumn
          field="geo_area_json"
          headerName="Geo Area"
          cellRenderer={GeoAreaMapRenderer}
        />
        <AgGridColumn
          field="moderators"
          headerName="Moderators"
          cellRenderer={ModeratorRenderer}
        />
        <AgGridColumn
          field="is_active"
          headerName="Active"
          cellRenderer={statusRenderer}
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
