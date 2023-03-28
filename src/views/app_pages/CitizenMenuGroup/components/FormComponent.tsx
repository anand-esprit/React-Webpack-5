import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { CitizenMenuRequest } from "../../../../requests/PageRequest";
import TagsComponent from "./TagsComponent";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
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
        form.setFieldsValue({
          name: editValues.name,
          nav_name: editValues.nav_name,
          sort_order: editValues.sort_order,
        });
      }
    }, [editValues, form]);

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
                rules={CitizenMenuRequest.name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Nav Name"
                placeholder="Nav Name"
                name="nav_name"
                onChange={handleChange}
                rules={CitizenMenuRequest.name_hi}
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
          </Row>
        </FormBox>
      </>
    );
  }
);

export default FormComponent;
