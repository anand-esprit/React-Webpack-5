import React, { useEffect, useState } from "react";
import { Col, Row, Form, Upload, Button } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { TopicRequest } from "../../../../requests/PageRequest";
// import debounce from "lodash/debounce";
import { PlusOutlined } from "@ant-design/icons";
import { CONSTANT } from "../../../../config/Constant";
import TagsComponent from "./TagsComponent";

const FormComponent: React.FC<any> = observer(
  ({
    form,
    id,
    handleSubmit,
    handleChange,
    editValues,
    type,
    iconFileProps,
    // iconList,
    // setIconList,
  }) => {
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
      if (editValues && type === "edit") {
        // if (editValues.icon) {
        //   setIconList([
        //     {
        //       uid: "-1",
        //       name: "image",
        //       status: "done",
        //       url: `${CONSTANT.AWS_BUCKET_URL + editValues.icon}`,
        //     },
        //   ]);
        // }
        form.setFieldsValue({
          name: editValues.name,
          name_hi: editValues.name_hi,
          disclaimer_link: editValues.disclaimer_link,
          tags: editValues.tags,
          is_map: editValues.is_map,
          authenticated: editValues.authenticated,
          description: editValues.description,
          is_active: editValues.is_active,
          sort_order: editValues.sort_order,
        });
      }
    }, [editValues, form]);

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

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
                rules={TopicRequest.name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Name Hi"
                placeholder="Name Hi"
                name="name_hi"
                onChange={handleChange}
                rules={TopicRequest.name_hi}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Disclaimer Link"
                placeholder="Disclaimer Link"
                name="disclaimer_link"
                onChange={handleChange}
                rules={TopicRequest.disclaimer_link}
              />
            </Col>
            {/* <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text label="Tags" placeholder="Tags" name="tags" />
          </Col> */}
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item label="Tags" required>
                <InputBox.Text required name="tags" hidden={true} />
                <Button
                  type="primary"
                  className="secondarySmallBtn"
                  onClick={openTagsModal}
                >
                  View
                </Button>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <Form.Item
                label="Icon"
                valuePropName="icon"
                name="icon"
                // onChange={handleChange}
              >
                <Upload
                  {...iconFileProps}
                  maxCount={1}
                  // fileList={iconList}
                  defaultFileList={
                    editValues?.icon
                      ? [
                          {
                            uid: "1",
                            // name: banner.title,
                            status: "done",
                            response: "Server Error 500", // custom error message to show
                            url: `${
                              CONSTANT.AWS_BUCKET_URL + editValues?.icon
                            }`,
                            // thumbUrl: banner.image,
                          },
                        ]
                      : null
                  }
                  multiple={false}
                  listType="picture-card"
                >
                  {uploadButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="Is Map"
                name="is_map"
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
                rules={TopicRequest.is_map}
              />
            </Col>
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="Authenticated"
                name="authenticated"
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
                rules={TopicRequest.authenticated}
              />
            </Col>
            <Col xs={{ span: 24 }}>
              <InputBox.TextArea
                label="Description"
                name="description"
                placeholder="Description"
                onChange={handleChange}
                rules={TopicRequest.description}
              />
            </Col>
            {type === "edit" && (
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <InputBox.Text
                  label="Sort Order"
                  placeholder="Sort Order"
                  name="sort_order"
                  onChange={handleChange}
                />
              </Col>
            )}
            <Col xs={{ span: 12 }} md={{ span: 8 }}>
              <InputBox.Radio
                label="Is Active"
                name="is_active"
                required
                onChange={handleChange}
                options={{
                  list: [
                    { id: 1, name: "Yes" },
                    { id: 0, name: "No" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
                rules={TopicRequest.is_active}
              />
            </Col>
          </Row>
        </FormBox>
      </>
    );
  }
);

export default FormComponent;
