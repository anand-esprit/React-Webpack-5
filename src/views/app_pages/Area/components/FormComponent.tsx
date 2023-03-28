import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spin } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { AreaRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";
import { Colorpicker } from "antd-colorpicker";
import { loadMapApi } from "../../../../utils/GoogleMapsUtils";
import MapComponent from "./MapComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Config from "../../../../config/Config";

const FormComponent: React.FC<any> = observer(
  ({
    form,
    id,
    handleSubmit,
    handleChange,
    editValues,
    type,
    handleZoneChange,
  }) => {
    const { LOV_STORE } = useStore();
    const { getZoneList } = LOV_STORE;
    const [fetchZone, setFetchZone] = useState<boolean>(true);
    const [mapModal, setMapModal] = useState<boolean>(false);
    const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
    const [hasPolygonCord, setHasPolygonCord] = useState<any>();
    const [geoAreaDisabled, setGeoAreaDisabled] = useState<boolean>(true);

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        let geoAreaJSOn;

        LOV_STORE.dropdown_zone_list = editValues.parent && [editValues.parent];

        if (editValues.geo_area_json) {
          setHasPolygonCord(
            JSON.parse(editValues.geo_area_json).coordinates[0]
          );
          geoAreaJSOn = JSON.parse(editValues.geo_area_json).coordinates[0];
        }

        form.setFieldsValue({
          name: editValues.name,
          code: parseInt(editValues.code),
          ward_id: editValues.ward_id,
          zone_id: editValues.zone_id,
          geo_address: editValues.geo_address,
          center_loc: editValues.center_loc,
          zoom_level: editValues.zoom_level,
          back_color: editValues.back_color,
          geo_loc: editValues.geo_loc,
          show_defined_area: editValues.show_defined_area,
          geo_area_json: JSON.stringify(geoAreaJSOn),
          latitude: editValues.latitude,
          longitude: editValues.longitude,
          area_km: editValues.area_km,
        });
      }
    }, [editValues, form]);

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

    const closeMapModal = () => {
      setMapModal(false);
    };

    const openMapModal = () => {
      setMapModal(true);
    };

    const setMapPolygonCord = (cord: any) => {
      form.setFieldsValue({ geo_area_json: JSON.stringify(cord) });
      setHasPolygonCord(cord);
    };

    const afterChangeGeoAreaTextarea = (cord: any) => {
      console.log("enter after change", cord.target.value);
      setHasPolygonCord(
        cord.target.value ? JSON.parse(cord.target.value) : null
      );
    };

    const geoAreaEnableDisable = () => {
      setGeoAreaDisabled(!geoAreaDisabled);
    };

    return (
      <>
        {mapModal && (
          <MapComponent
            visible={mapModal}
            close={closeMapModal}
            // addGeoArea={addGeoArea}
            // editValues={editValues}
            mapScriptLoaded={mapScriptLoaded} // for script load or not
            setMapPolygonCord={setMapPolygonCord} // for set new cord of polygon
            hasPolygonCord={hasPolygonCord} // for already polygon cord
            type={type}
          />
        )}
        <FormBox
          form={form}
          id={id}
          onFinish={handleSubmit}
          onChange={handleChange}
        >
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Zone"
                name="zone_id"
                placeholder="Select Zone"
                onFocus={() =>
                  fetchZone && getZoneList().then(() => setFetchZone(false))
                }
                onChange={() => {
                  handleChange();
                  handleZoneChange();
                }}
                notFoundContent={
                  fetchZone ? <Spin size="small" /> : "No Record Found."
                }
                // onChange={(e) => handleStateChange(e)}
                options={{
                  list: LOV_STORE.dropdown_zone_list,
                  valueKey: "id",
                  textKey: "name",
                }}
              />
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Ward"
                name="ward_id"
                placeholder="Select Ward"
                onChange={handleChange}
                // onFocus={() =>
                //   fetchWard &&   ().then(() => setFetchWard(false))
                // }
                // notFoundContent={
                //   fetchWard ? <Spin size="small" /> : "No Record Found."
                // }
                // onChange={(e) => handleStateChange(e)}
                options={{
                  list: LOV_STORE.dropdown_ward_list,
                  valueKey: "id",
                  textKey: "name",
                }}
              />
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Name"
                placeholder="Name"
                name="name"
                rules={AreaRequest.name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Code"
                placeholder="Code"
                name="code"
                rules={AreaRequest.code}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 10 }}>
              <InputBox.Text
                required
                label="Back Color"
                placeholder="Back Color"
                name="back_color"
                rules={AreaRequest.back_color}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 2 }}>
              <Form.Item label={"Color"} name={`back_color`}>
                <Colorpicker
                  popup
                  // onChange={handleChange}
                  onColorResult={(color) => color.hex}
                  blockStyles={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Latitude"
                placeholder="Latitude"
                name="latitude"
                onChange={handleChange}
                // rules={SubZoneRequest.code}
              />
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Longitude"
                placeholder="Longitude"
                name="longitude"
                onChange={handleChange}
                // rules={SubZoneRequest.code}
              />
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Center LOC"
                placeholder="Center LOC"
                name="center_loc"
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Area KM"
                placeholder="Area KM"
                name="area_km"
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Zoom Level"
                placeholder="Zoom Level"
                name="zoom_level"
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row gutter={15}>
            <Col
              xs={{ span: 24 }}
              md={{ span: 24 }}
              className="backgroundWrap geoAreaWrap"
            >
              <h2>Geo Area</h2>
              <Row>
                <Col xs={{ span: 24 }} md={{ span: 20 }}></Col>
                <Col xs={{ span: 24 }} md={{ span: 4 }} className="text-right">
                  <Button
                    type="primary"
                    className="secondarySmallBtn mb-15"
                    onClick={openMapModal}
                  >
                    Map
                  </Button>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }}>
                  <Form.Item>
                    <InputBox.TextArea
                      disabled={geoAreaDisabled}
                      name="geo_area_json"
                      onChange={handleChange}
                      onBlur={(e: any) => afterChangeGeoAreaTextarea(e)}
                    />
                  </Form.Item>
                  {geoAreaDisabled ? (
                    <Button
                      type="primary"
                      className="iconBtn orangeBorder"
                      onClick={geoAreaEnableDisable}
                    >
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        color={Config.orangeBtn}
                      />
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      className="iconBtn blueBorder"
                      onClick={geoAreaEnableDisable}
                    >
                      <FontAwesomeIcon icon={faCheck} color={Config.blueBtn} />
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={{ span: 12 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Geo Address"
                placeholder="Geo Address"
                name="geo_address"
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Show Defined Area"
                name="show_defined_area"
                required
                onChange={handleChange}
                rules={AreaRequest.show_defined_area}
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
              />
            </Col>
          </Row>
        </FormBox>
      </>
    );
  }
);

export default FormComponent;
