import React, { useEffect, useState } from "react";
import { Col, Row, Spin, TreeSelect, Form, Button, Upload } from "antd";
import { observer } from "mobx-react";
import { CONSTANT } from "../../../../config/Constant";
import { PlusOutlined } from "@ant-design/icons";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { ACOCitizenSectionRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";
import TagsComponent from "./TagsComponent";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type, iconProps }) => {
    const { LOV_STORE } = useStore();
    const {
      getACOCitizenSectionTreeList,
      getTopicList,
      getCitizenMenuGroupList,
    } = LOV_STORE;
    const [fetchACOCitizenSection, setFetchACOCitizenSection] =
      useState<boolean>(true);
    const [fetchTopic, setFetchTopic] = useState<boolean>(true);
    const [fetchCitizenMenuGroup, setFetchCitizenMenuGroup] =
      useState<boolean>(true);
    const [imageURL, setimageURL] = useState();

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const [tagsModal, setTagsModal] = useState<boolean>(false);

    const addTags = (data: any) => {
      form.setFieldsValue({
        tags: JSON.stringify(data.tags),
      });
      closeTagsModal();
    };

    const closeTagsModal = () => {
      setTagsModal(false);
    };

    const openTagsModal = () => {
      setTagsModal(true);
    };

    // set the form values to edit
    useEffect(() => {
      console.log("editValues", editValues);
      if (editValues && type === "edit") {
        // console.log("image", CONSTANT.AWS_BUCKET_URL + editValues?.icon);
        setimageURL(CONSTANT.AWS_BUCKET_URL + editValues.icon);
        LOV_STORE.dropdown_topic_list = editValues.topic_detail;
        LOV_STORE.dropdown_citizen_menu_group_list =
          editValues.citizen_menu_group && [editValues.citizen_menu_group];

        LOV_STORE.dropdown_aco_citizen_section_tree_list =
          editValues.parent && [
            {
              parent: editValues.parent,
              name: editValues.parent.name,
              children: [],
            },
          ];

        form.setFieldsValue({
          name: editValues.name,
          nav_name: editValues.nav_name,
          name_hi: editValues.name_hi,
          web_url: editValues.web_url,
          place_call: editValues.place_call,
          email: editValues.email,
          view_opt: editValues.view_opt,
          desc: editValues.desc,
          sort_order: editValues.sort_order,
          parent_id: editValues.parent_id,
          topic_ids: editValues.topic_detail
            ? editValues.topic_detail.map((item: any) => item.id)
            : [],
          display_type_of_child_menu: editValues.display_type_of_child_menu,
          is_login_required: editValues.is_login_required,
          citizen_menu_group_id: editValues.citizen_menu_group_id,
        });
        console.log(
          "treeselect",
          LOV_STORE.dropdown_aco_citizen_section_tree_list
        );
      }
    }, [editValues, form, imageURL]);

    console.log("imageURL", imageURL);

    return (
      <>
        <TagsComponent
          visible={tagsModal}
          close={closeTagsModal}
          addTags={addTags}
          editValues={editValues}
          type={type}
        />
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
                label="Name"
                placeholder="Name"
                name="name"
                rules={ACOCitizenSectionRequest.name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Name In Hindi"
                placeholder="Name In Hindi"
                name="name_hi"
                rules={ACOCitizenSectionRequest.name_hi}
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Nav Name"
                placeholder="Navigation Name"
                name="nav_name"
                rules={ACOCitizenSectionRequest.nav_name}
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Web Url"
                placeholder="Web Url"
                name="web_url"
                rules={ACOCitizenSectionRequest.web_url}
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Place Call"
                placeholder="Place Call"
                name="place_call"
                rules={ACOCitizenSectionRequest.place_call}
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Email"
                placeholder="Email"
                name="email"
                rules={ACOCitizenSectionRequest.email}
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item label="Tags">
                <InputBox.Text name="tags" hidden={true} />
                <Button
                  type="primary"
                  className="secondarySmallBtn"
                  onClick={openTagsModal}
                >
                  View
                </Button>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="View Option"
                name="view_opt"
                required
                placeholder="Select View Option"
                options={{
                  list: [
                    { id: "android", name: "Android" },
                    { id: "web", name: "Web" },
                    { id: "call", name: "Call" },
                    { id: "email", name: "Email" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                rules={ACOCitizenSectionRequest.view_opt}
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Parent"
                valuePropName="parent_id"
                name="parent_id"
              >
                <TreeSelect
                  // showSearch
                  defaultValue={
                    editValues && type === "edit" && editValues.controller_name
                  }
                  showSearch
                  treeNodeFilterProp="name"
                  filterTreeNode={(search, item: any) => {
                    return (
                      item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
                    );
                  }}
                  placeholder="Please select"
                  allowClear
                  treeDefaultExpandAll
                  onFocus={() =>
                    fetchACOCitizenSection &&
                    getACOCitizenSectionTreeList().then(() =>
                      setFetchACOCitizenSection(false)
                    )
                  }
                  notFoundContent={
                    fetchACOCitizenSection ? (
                      <Spin size="small" />
                    ) : (
                      "No Record Found."
                    )
                  }
                  onChange={handleChange}
                  fieldNames={{ value: "id", label: "name" }}
                  treeData={LOV_STORE.dropdown_aco_citizen_section_tree_list}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Topic"
                name="topic_ids"
                mode="multiple"
                showArrow
                placeholder="Select Topic"
                onFocus={() =>
                  fetchTopic && getTopicList().then(() => setFetchTopic(false))
                }
                notFoundContent={
                  fetchTopic ? <Spin size="small" /> : "No Record Found."
                }
                options={{
                  list: LOV_STORE.dropdown_topic_list,
                  valueKey: "id",
                  textKey: "name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Display type Of Child Menu"
                name="display_type_of_child_menu"
                placeholder="Select Display type Of Child Menu"
                options={{
                  list: [
                    { id: "List", name: "List" },
                    { id: "Grid", name: "Grid" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label="Citizen Menu Group Id"
                name="citizen_menu_group_id"
                placeholder="Select Citizen Menu Group"
                onFocus={() =>
                  fetchCitizenMenuGroup &&
                  getCitizenMenuGroupList().then(() =>
                    setFetchCitizenMenuGroup(false)
                  )
                }
                notFoundContent={
                  fetchCitizenMenuGroup ? (
                    <Spin size="small" />
                  ) : (
                    "No Record Found."
                  )
                }
                options={{
                  list: LOV_STORE.dropdown_citizen_menu_group_list,
                  valueKey: "id",
                  textKey: "nav_name",
                }}
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={handleChange}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Radio
                label="Is Login Required"
                name="is_login_required"
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
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label="Icon"
                valuePropName="icon"
                // rules={AppMasterRequest.fav_icon}
              >
                <Upload
                  {...iconProps}
                  maxCount={1}
                  // fileList={fileFavIconList}
                  defaultFileList={
                    editValues
                      ? [
                          {
                            uid: "1",
                            // name: banner.title,
                            status: "done",
                            response: "Server Error 500", // custom error message to show
                            url: imageURL,
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

            {type === "edit" ? (
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <InputBox.Text
                  required
                  label="Sort Order"
                  placeholder="Sort Order"
                  name="sort_order"
                  rules={ACOCitizenSectionRequest.sort_order}
                  onChange={handleChange}
                />
              </Col>
            ) : (
              <></>
            )}
          </Row>
          <Row gutter={15}>
            <Col xs={{ span: 24 }}>
              <InputBox.TextArea
                label="Description"
                name="desc"
                placeholder="Description"
                rules={ACOCitizenSectionRequest.desc}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </FormBox>
      </>
    );
  }
);

export default FormComponent;
