import React, { useEffect, useState } from "react";
import { AgGridColumn } from "ag-grid-react";
import AgGridWrapper from "../../../../components/AgGridWrapper/AgGridWrapper";
// import { AppMasterListDataProps } from "../../../../store/UserStore/UserInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "antd/es/button";
import {
  faPencilAlt,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Config from "../../../../config/Config";
import useStore from "../../../../store";
import { loadMapApi } from "../../../../utils/GoogleMapsUtils";
import MapComponent from "./MapComponent";

const ListComponent: React.FC<any> = ({
  rowData,
  getData,
  openDeleteModal,
  openEditModal,
}) => {
  const { AUTH, SUB_ZONE_STORE } = useStore();
  const { setupGrid } = SUB_ZONE_STORE;

  const [mapModal, setMapModal] = useState<boolean>(false);
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  const [hasPolygonCord, setHasPolygonCord] = useState<any>();

  const closeMapModal = () => {
    setMapModal(false);
  };

  const openMapModal = (data: any) => {
    setHasPolygonCord(JSON.parse(data.geo_area_json).coordinates[0]);
    setMapModal(true);
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

  const GeoAreaMapRenderer = (props: any) => {
    return (
      <>
        {props.data.geo_area_json && (
          <Button
            type="text"
            title={"View"}
            className=""
            onClick={() => openMapModal(props.data)}
          >
            <FontAwesomeIcon icon={faEye} color={Config.blueBtn} />
          </Button>
        )}
      </>
    );
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
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
        components={{ ActionRenderer }}
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
        <AgGridColumn field="code" headerName="Subzone Code" />
        <AgGridColumn field="parent.name" headerName="Parent" />
        <AgGridColumn field="area_km" headerName="Area KM" />
        <AgGridColumn field="zoom_level" headerName="Zoom Level" />
        <AgGridColumn
          field="back_color"
          headerName="Display Color"
          filter={null}
          cellClass="colorBoxCell"
          cellRenderer={(params: any) => (
            <div
              className="gridColorBox"
              style={{ backgroundColor: params.data.back_color }}
            ></div>
          )}
        />
        <AgGridColumn
          field="geo_area_json"
          headerName="Geo Area"
          cellRenderer={GeoAreaMapRenderer}
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
