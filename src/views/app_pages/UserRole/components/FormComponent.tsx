import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { UserRoleRequest } from "../../../../requests/PageRequest";
import { USER_ROLES } from "../../../../config/Config";
// import debounce from "lodash/debounce";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        form.setFieldsValue({
          name: editValues.name,
          description: editValues.description,
          code: parseInt(editValues.code),
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
              rules={UserRoleRequest.name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              label="Code"
              name="code"
              required
              rules={UserRoleRequest.Code}
              placeholder="Select Role"
              onChange={handleChange}
              options={{
                list: USER_ROLES,
                valueKey: "id",
                textKey: "name",
              }}
            />
          </Col>
        </Row>
        <Row gutter={15}>
          <Col xs={{ span: 24 }}>
            <InputBox.TextArea
              label="Description"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              rules={UserRoleRequest.description}
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
