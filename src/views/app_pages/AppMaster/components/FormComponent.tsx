import React, { useEffect, useState } from "react";
import { Col, Row, Form, Upload, Button } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { PlusOutlined } from "@ant-design/icons";
import { AppMasterRequest } from "../../../../requests/PageRequest";
import ModeratorComponent from "./ModeratorComponent";
import MapComponent from "./MapComponent";
import { CONSTANT } from "../../../../config/Constant";
import { loadMapApi } from "../../../../utils/GoogleMapsUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Config from "../../../../config/Config";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({
    form,
    id,
    handleSubmit,
    handleChange,
    logoUrlProps,
    favIconProps,
    editValues,
    type,
    // setFileLogoList,
    // fileLogoList,
    // setfileFavIconList,
    // fileFavIconList,
  }) => {
    const [moderatorModal, setModeratorModal] = useState<boolean>(false);
    const [mapModal, setMapModal] = useState<boolean>(false);
    const [mapScriptLoaded, setMapScriptLoaded] = useState(false);
    const [hasPolygonCord, setHasPolygonCord] = useState<any>();
    const [geoAreaDisabled, setGeoAreaDisabled] = useState<boolean>(true);

    const addModerator = (data: any) => {
      form.setFieldsValue({
        moderators: JSON.stringify(data.moderators),
      });
      closeModeratorModal();
    };

    // const addGeoArea = (data: any) => {
    //   console.log("data", data);
    //   form.setFieldsValue({
    //     geo_area_json: data.polygon_latlong,
    //   });
    //   closeMapModal();
    // };

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

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        console.log("editValues", editValues.fav_icon);
        let geoAreaJSOn;

        // if (editValues.logo_url) {
        //   setFileLogoList([
        //     {
        //       uid: "-1",
        //       name: "image",
        //       status: "done",
        //       url: `${CONSTANT.AWS_BUCKET_URL + editValues.logo_url}`,
        //     },
        //   ]);
        // }
        // if (editValues.fav_icon) {
        //   setfileFavIconList([
        //     {
        //       uid: "-1",
        //       name: "image",
        //       status: "done",
        //       url: `${CONSTANT.AWS_BUCKET_URL + editValues.fav_icon}`,
        //     },
        //   ]);
        // }

        if (editValues.geo_area_json) {
          setHasPolygonCord(
            JSON.parse(editValues.geo_area_json).coordinates[0]
          );
          geoAreaJSOn = JSON.parse(editValues.geo_area_json).coordinates[0];
        }

        form.setFieldsValue({
          app_name: editValues.app_name,
          admin_email: editValues.admin_email,
          auto_feedback_subject: editValues.auto_feedback_subject,
          auto_registration_subject: editValues.auto_registration_subject,
          officer_app_name: editValues.officer_app_name,
          citizen_app_name: editValues.citizen_app_name,
          def_timezone: editValues.def_timezone,
          feedback_subject: editValues.feedback_subject,
          from_email: editValues.from_email,
          geo_area_json: JSON.stringify(geoAreaJSOn),
          is_active: editValues.is_active,
          is_city_range_check: editValues.is_city_range_check,
          is_email_required: editValues.is_email_required,
          is_mobile_required: editValues.is_mobile_required,
          only_mobile_login: editValues.only_mobile_login,
          post_comments_limit: editValues.post_comments_limit,
          reset_password_subject: editValues.reset_password_subject,
          sms_phone_verification: editValues.sms_phone_verification,
          source_domain: editValues.source_domain,
          api_key: editValues.api_key,
          moderators: editValues.moderators,
          project_list_by: editValues.project_list_by,
          dept_wise_subcat: editValues.dept_wise_subcat,
          is_show_department_who_is_in: editValues.is_show_department_who_is_in,
          upgrade_301: editValues.upgrade_301,
          upgrade_300: editValues.upgrade_300,
          officer_app_upgrade_301: editValues.officer_app_upgrade_301,
          officer_app_upgrade_300: editValues.officer_app_upgrade_300,
          // fav_icon: editValues.fav_icon,
          // logo_url: editValues.logo_url,
        });
      }
    }, [editValues, form]);

    const closeModeratorModal = () => {
      setModeratorModal(false);
    };

    const openModeratorModal = () => {
      setModeratorModal(true);
    };

    const closeMapModal = () => {
      setMapModal(false);
    };

    const openMapModal = () => {
      setMapModal(true);
    };

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    //   const renderDistanceSentence = () => {
    //     return (
    //         <div className='distance-info'>
    //             {`Distance between selected marker and home address is ${distanceInKm}km.`}
    //         </div>
    //     );
    // };

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

    // useEffect(() => {
    //   if (form.getFieldValue("geo_area_json")) {
    //     console.log("enter");
    //     setHasPolygonCord(JSON.parse(form.getFieldValue("geo_area_json")));
    //   }
    // }, [form]);

    const geoAreaEnableDisable = () => {
      setGeoAreaDisabled(!geoAreaDisabled);
    };

    return (
      <>
        <ModeratorComponent
          visible={moderatorModal}
          close={closeModeratorModal}
          addModerator={addModerator}
          editValues={editValues}
          type={type}
        />
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
        {/* {distanceInKm > -1 && renderDistanceSentence()} */}
        {/* {mapScriptLoaded && (
          <Map
            // mapType={google.maps.MapTypeId.ROADMAP}
            mapTypeControl={true}
            setPolygonCordinateVal={setPolygonCordinateVal}
            latitudeVal={AUTH.latitudeVal}
            longitudeVal={AUTH.longitudeVal}
            // zoomLevel={14}
            // setDistanceInKm={setDistanceInKm}
          />
        )} */}
        <FormBox
          form={form}
          id={id}
          onFinish={handleSubmit}
          onChange={handleChange}
        >
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="App Name"
                placeholder="App Name"
                name="app_name"
                rules={AppMasterRequest.app_name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Officer App Name"
                placeholder="Officer App Name"
                name="officer_app_name"
                rules={AppMasterRequest.officer_app_name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Citizen App Name"
                placeholder="Citizen App Name"
                name="citizen_app_name"
                rules={AppMasterRequest.citizen_app_name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Def Timezone"
                placeholder="Def Timezone"
                name="def_timezone"
                rules={AppMasterRequest.def_timezone}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Source Domain"
                placeholder="Source Domain"
                name="source_domain"
                rules={AppMasterRequest.source_domain}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Admin Email"
                placeholder="Admin Email"
                name="admin_email"
                rules={AppMasterRequest.admin_email}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="From Email"
                placeholder="From Email"
                name="from_email"
                rules={AppMasterRequest.from_email}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Auto Feedback Subject"
                placeholder="Auto Feedback Subject"
                name="auto_feedback_subject"
                rules={AppMasterRequest.auto_feedback_subject}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Auto Registration Subject"
                placeholder="Auto Registration Subject"
                name="auto_registration_subject"
                rules={AppMasterRequest.auto_registration_subject}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Feedback Subject"
                placeholder="Feedback Subject"
                name="feedback_subject"
                rules={AppMasterRequest.feedback_subject}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Reset Password Subject"
                placeholder="Reset Password Subject"
                name="reset_password_subject"
                rules={AppMasterRequest.reset_password_subject}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Post Comments Limit"
                placeholder="Post Comments Limit"
                name="post_comments_limit"
                rules={AppMasterRequest.post_comments_limit}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="Is City Range Check"
                name="is_city_range_check"
                required
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_city_range_check}
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="SMS Phone Verification"
                name="sms_phone_verification"
                required
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.sms_phone_verification}
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="Only Mobile Login"
                name="only_mobile_login"
                required
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.only_mobile_login}
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="Is Mobile Required"
                name="is_mobile_required"
                required
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_mobile_required}
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="IS Email Required"
                name="is_email_required"
                required
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_email_required}
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="Is Active"
                name="is_active"
                required
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_active}
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
              {/* <InputBox.Text
                required
                label="Geo Area"
                placeholder="Geo Area"
                name="geo_area"
                rules={AppMasterRequest.geo_area}
              /> */}
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Api Key"
                placeholder="Api Key"
                name="api_key"
                rules={AppMasterRequest.api_key}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item label="Moderators" required>
                <InputBox.Text required name="moderators" hidden={true} />
                <Button
                  type="primary"
                  className="secondarySmallBtn"
                  onClick={openModeratorModal}
                >
                  Manage
                </Button>
              </Form.Item>
            </Col>
            {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                required
                label="Project List By"
                placeholder="Project List By"
                name="project_list_by"
                rules={AppMasterRequest.project_list_by}
              />
            </Col> */}

            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Project List By"
                name="project_list_by"
                placeholder="Select Project list by"
                required
                options={{
                  list: [
                    { id: "Ward", name: "Ward" },
                    { id: "Zone", name: "Zone" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.project_list_by}
              />
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Department Wise SubCategory?"
                name="dept_wise_subcat"
                required
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.dept_wise_subcat}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Is Show Department Who is in?"
                name="is_show_department_who_is_in"
                required
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_show_department_who_is_in}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Is Swachta Integration?"
                name="is_swachta_integration"
                required
                initialValue={0}
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_swachta_integration}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Is Face Recognization Enable?"
                name="is_face_rec_enable"
                required
                initialValue={0}
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_face_rec_enable}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Is Places Enable?"
                name="is_places_enabled"
                required
                initialValue={0}
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_places_enabled}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Is Menu Grouping?"
                name="is_menu_grouping"
                required
                initialValue={0}
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
                rules={AppMasterRequest.is_menu_grouping}
              />
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.TextArea
                required
                label="Upgrade 301"
                placeholder="Upgrade 301"
                name="upgrade_301"
                rules={AppMasterRequest.upgrade_301}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.TextArea
                required
                label="Upgrade 300"
                placeholder="Upgrade 300"
                name="upgrade_300"
                rules={AppMasterRequest.upgrade_300}
              />
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.TextArea
                required
                label="Officer App Upgrade 301"
                placeholder="Officer App Upgrade 301"
                name="officer_app_upgrade_301"
                rules={AppMasterRequest.officer_app_upgrade_301}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.TextArea
                required
                label="Officer App Upgrade 300"
                placeholder="Officer App Upgrade 300"
                name="officer_app_upgrade_300"
                rules={AppMasterRequest.officer_app_upgrade_300}
              />
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Logo URL"
                valuePropName="logo_url"
                required
                rules={AppMasterRequest.logo_url}
              >
                <Upload
                  {...logoUrlProps}
                  maxCount={1}
                  // fileList={fileLogoList}
                  defaultFileList={
                    editValues?.logo_url
                      ? [
                          {
                            uid: "1",
                            // name: banner.title,
                            status: "done",
                            response: "Server Error 500", // custom error message to show
                            url: `${
                              CONSTANT.AWS_BUCKET_URL + editValues?.logo_url
                            }`,
                            // thumbUrl: banner.image,
                          },
                        ]
                      : []
                  }
                  // defaultFileList= {
                  //   uid: '1',
                  //   url: 'http://www.baidu.com/xxx.png'
                  // }
                  multiple={false}
                  listType="picture-card"
                >
                  {uploadButton}
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Fav Icon"
                valuePropName="fav_icon"
                required
                rules={AppMasterRequest.fav_icon}
              >
                <Upload
                  {...favIconProps}
                  maxCount={1}
                  // fileList={fileFavIconList}
                  defaultFileList={
                    editValues?.fav_icon
                      ? [
                          {
                            uid: "1",
                            // name: banner.title,
                            status: "done",
                            response: "Server Error 500", // custom error message to show
                            url: `${
                              CONSTANT.AWS_BUCKET_URL + editValues?.fav_icon
                            }`,
                            // thumbUrl: banner.image,
                          },
                        ]
                      : []
                  }
                  multiple={false}
                  listType="picture-card"
                >
                  {uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </FormBox>
      </>
    );
  }
);

export default FormComponent;
