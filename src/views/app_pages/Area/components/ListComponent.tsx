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
import { loadMapApi } from "../../../../utils/GoogleMapsUtils";
import MapComponent from "./MapComponent";
// import { convertTextToID } from "../../../../config/Global";

const ListComponent: React.FC<any> = ({
  // rowData,
  // getData,
  openDeleteModal,
  openEditModal,
}) => {
  const { AUTH, AREA_STORE, LOV_STORE } = useStore();
  const { setupGrid } = AREA_STORE;

  const [mapModal, setMapModal] = useState<boolean>(false);
  const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
  const [hasPolygonCord, setHasPolygonCord] = useState<any>();

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
            <FontAwesomeIcon icon={faEye} color={Config.blueBtn} />
          </Button>
        ) : (
          "N/A"
        )}
      </>
    );
  };

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("first");
  //     LOV_STORE.getWardList({ id: 943 });
  //     const ward_lov_val = AREA_STORE.agGrid.api.getColumn("ward_id");
  //     console.log(ward_lov_val);
  //     // AREA_STORE.agGrid.api.setColumnDefs(columnDefs);
  //   }, 5000);
  // }, []);

  // const changeFilterAndSort = (props: any) => {
  //   console.log("props", props);
  // };

  // const getZoneIds = (params: any) => {

  //   const setFilter = params.api.getFilterInstance('ward_id');
  //   AREA_STORE.zone_ids = params.api.getFilterInstance("zone_id").appliedModel;
  //   AREA_STORE.zone_ids = convertTextToID(
  //     AREA_STORE.zone_ids,
  //     AREA_STORE.zone_list,
  //     "name",
  //     "id"
  //   );
  //   AREA_STORE.zone_ids = { zone_ids: AREA_STORE.zone_ids }
  //   // debugger;
  //   setFilter.refreshFilterValues();
  // return (
  //   <>
  //     {
  // if (params) {
  //   {
  //     console.log(
  //       "params data list",
  //       params.api.getFilterInstance("zone_id").appliedModel,
  //       params.api.getFilterInstance("zone_id").appliedModel.values
  //     );
  //   }
  // setZoneIds(params.api.getFilterInstance("zone_id").appliedModel.values);
  // AREA_STORE.zone_ids =
  //   params.api.getFilterInstance("zone_id").appliedModel.values;
  // AREA_STORE.zone_ids = {
  //   zone_ids: params.api.getFilterInstance("zone_id").appliedModel,
  // };
  // }
  //     }
  //   </>
  // );
  // };

  // console.log("zoneIds", AREA_STORE.zone_ids);

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
        type="serverSide"
        // rowData={rowData}
        components={{ ActionRenderer }}
        onGridReady={setupGrid}
        onFilterChanged={AREA_STORE.updateDependantLOVFilter}
      >
        <AgGridColumn
          field="id"
          headerName="# ID"
          pinned="left"
          width={100}
          minWidth={100}
          filter="agNumberColumnFilter"
          initialHide={true}
        />
        <AgGridColumn
          field="zone_id"
          headerName="Zone Name"
          filter="agSetColumnFilter"
          cellRenderer={function (data: any) {
            return data.data?.zone?.name;
          }}
          filterParams={{
            values: (params: any) => {
              console.log("enter");
              LOV_STORE.getZoneList().then((data: any) => {
                AREA_STORE.setZoneList(data);
                params.success([...data.map((x: any) => x.name)]);
              });
            },
            buttons: ["apply", "reset"],
            closeOnApply: true,
          }}
          // valueGetter={getZoneIds}
        />
        <AgGridColumn
          field="ward_id"
          headerName="Ward Name"
          filter="agSetColumnFilter"
          cellRenderer={function (data: any) {
            return data.data?.ward?.name;
          }}
          filterParams={{
            values: (params: any) => {
              LOV_STORE.getWardList(AREA_STORE.zone_ids).then((data: any) => {
                AREA_STORE.setWardList(data);
                params.success([...data.map((x: any) => x.name)]);
              });
            },
            buttons: ["apply", "reset"],
            closeOnApply: true,
          }}
        />
        <AgGridColumn field="name" headerName="Name" />
        <AgGridColumn
          field="geo_area_json"
          headerName="Geo Area"
          cellRenderer={GeoAreaMapRenderer}
          filter={false}
        />
        <AgGridColumn
          field="updated_at"
          headerName="Updated At"
          filter="agDateColumnFilter"
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
