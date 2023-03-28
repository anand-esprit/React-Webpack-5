import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spin } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { SubZoneRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";
import { Colorpicker } from "antd-colorpicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Config from "../../../../config/Config";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { loadMapApi } from "../../../../utils/GoogleMapsUtils";
import MapComponent from "./MapComponent";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getSubZoneList, getDepartmentList, getSubCategoryList } = LOV_STORE;
    const [fetchDepartment, setFetchDepartment] = useState<boolean>(true);
    const [fetchSubZone, setFetchSubZone] = useState<boolean>(true);
    const [fetchSubCategory, setFetchSubCategory] = useState<boolean>(true);
    const [mapModal, setMapModal] = useState<boolean>(false);
    const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
    const [hasPolygonCord, setHasPolygonCord] = useState<any>();
    const [geoAreaDisabled, setGeoAreaDisabled] = useState<boolean>(true);

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        let geoAreaJSOn;

        LOV_STORE.dropdown_department_list = editValues.department && [
          editValues.department,
        ];

        LOV_STORE.dropdown_subzone_list = editValues.parent && [
          editValues.parent,
        ];
        LOV_STORE.dropdown_sub_category_list = editValues.sub_category;

        if (editValues.geo_area_json) {
          setHasPolygonCord(
            JSON.parse(editValues.geo_area_json).coordinates[0]
          );
          geoAreaJSOn = JSON.parse(editValues.geo_area_json).coordinates[0];
        }

        form.setFieldsValue({
          name: editValues.name,
          code: editValues.code,
          area_km: editValues.area_km,
          center_loc: editValues.center_loc,
          zoom_level: editValues.zoom_level,
          department_id: editValues.department_id,
          parent_id: editValues.parent_id,
          sub_category_ids: editValues.sub_category
            ? editValues.sub_category.map((item: any) => item.id)
            : [],
          back_color: editValues.back_color,
          geo_area_json: JSON.stringify(geoAreaJSOn),
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
                label="Parent"
                name="parent_id"
                placeholder="Select Parent"
                onFocus={() =>
                  fetchSubZone &&
                  getSubZoneList().then(() => setFetchSubZone(false))
                }
                notFoundContent={
                  fetchSubZone ? <Spin size="small" /> : "No Record Found."
                }
                onChange={handleChange}
                // onChange={(e) => handleStateChange(e)}
                options={{
                  list: LOV_STORE.dropdown_subzone_list,
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
                rules={SubZoneRequest.name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Code"
                placeholder="Code"
                name="code"
                rules={SubZoneRequest.code}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 10 }}>
              <InputBox.Text
                required
                label="Back Color"
                placeholder="Back Color"
                name="back_color"
                rules={SubZoneRequest.back_color}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 2 }}>
              <Form.Item label={"Color"} name={`back_color`}>
                <Colorpicker
                  popup
                  onColorResult={(color) => color.hex}
                  blockStyles={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 24 }}>
              <InputBox.Select
                label="Sub Categories"
                name="sub_category_ids"
                placeholder="Sub Categories"
                showArrow
                mode="multiple"
                onFocus={() =>
                  fetchSubCategory &&
                  getSubCategoryList().then(() => setFetchSubCategory(false))
                }
                notFoundContent={
                  fetchSubCategory ? <Spin size="small" /> : "No Record Found."
                }
                onChange={handleChange}
                // onChange={(e) => handleStateChange(e)}
                options={{
                  list: LOV_STORE.dropdown_sub_category_list,
                  valueKey: "id",
                  textKey: "name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              />
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Department"
                name="department_id"
                placeholder="Select Department"
                onChange={handleChange}
                onFocus={() =>
                  fetchDepartment &&
                  getDepartmentList().then(() => setFetchDepartment(false))
                }
                notFoundContent={
                  fetchDepartment ? <Spin size="small" /> : "No Record Found."
                }
                // onChange={(e) => handleStateChange(e)}
                options={{
                  list: LOV_STORE.dropdown_department_list,
                  valueKey: "id",
                  textKey: "name",
                }}
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
        </FormBox>
      </>
    );
  }
);

export default FormComponent;