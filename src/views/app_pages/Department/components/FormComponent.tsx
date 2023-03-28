import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { DepartmentRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getDepartmentList } = LOV_STORE;
    const [fetchDepartment, setFetchDepartment] = useState<boolean>(true);
    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        LOV_STORE.dropdown_department_list = editValues.parent && [
          editValues.parent,
        ];

        form.setFieldsValue({
          name: editValues.name,
          code: editValues.code,
          escalate_email1: editValues.escalate_email1,
          parent_id: editValues.parent_id,
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
              label="Code"
              placeholder="Code"
              name="code"
              rules={DepartmentRequest.code}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              required
              label="Name"
              placeholder="Name"
              name="name"
              rules={DepartmentRequest.name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Text
              label="Escalate Email"
              placeholder="Escalate Email"
              name="escalate_email1"
              onChange={handleChange}
              rules={DepartmentRequest.escalate_email1}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              label="Parent"
              name="parent_id"
              placeholder="Select Parent Department"
              showArrow
              showSearch
              onFocus={() =>
                fetchDepartment &&
                getDepartmentList().then(() => setFetchDepartment(false))
              }
              notFoundContent={
                fetchDepartment ? <Spin size="small" /> : "No Record Found."
              }
              options={{
                list: LOV_STORE.dropdown_department_list,
                valueKey: "id",
                textKey: "name",
              }}
              onChange={handleChange}
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
