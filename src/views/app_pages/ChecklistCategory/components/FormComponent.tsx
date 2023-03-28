import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { ChecklistCategoryRequest } from "../../../../requests/PageRequest";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        form.setFieldsValue({
          name: editValues.name,
          code: editValues.code,
          desc: editValues.desc,
          is_active: editValues.is_active,
        });
      }
    }, [editValues, form]);

    return (
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
              rules={ChecklistCategoryRequest.name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Code"
              placeholder="Code"
              name="code"
              rules={ChecklistCategoryRequest.code}
            />
          </Col>
          <Col xs={{ span: 24 }}>
            <InputBox.TextArea
              label="Description"
              name="desc"
              placeholder="Description"
              rules={ChecklistCategoryRequest.desc}
              onChange={handleChange}
            />
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 12 }}>
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
              rules={ChecklistCategoryRequest.is_active}
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
