import React from "react";
import { observer } from "mobx-react-lite";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Map from "../../../map/";

const MapComponent: React.FC<any> = observer((props) => {
  const close = () => {
    props.close();
  };

  console.log("props.hasPolygonCord", props.hasPolygonCord);

  return (
    <Modal
      centered
      title="Geo Area"
      width="80%"
      className="mapModal"
      destroyOnClose
      open={props.visible}
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      onCancel={close}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={null}
    >
      {props.mapScriptLoaded && (
        <Map
          mapTypeControl={true}
          setMapPolygonCord={props.setMapPolygonCord}
          hasPolygonCord={props.hasPolygonCord}
          type={props.type}
          close={props.close}
        />
      )}

      {/* <FormBox form={form} id="geoMapForm" onFinish={props.addGeoArea}>
        <div className="mapModal">
          <div className="pac-card" id="pac-card">
            <InputBox.Text required name="polygon_latlong" hidden={true} />
            <InputBox.Text
              label="Locations"
              type="text"
              name="polygon_location"
              placeholder="Enter a location"
            />
          </div>
          <div id="map"></div>
        </div>
      </FormBox> */}
    </Modal>
  );
});
export default MapComponent;
