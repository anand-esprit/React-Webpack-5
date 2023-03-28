import React, { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { DesignationRequest } from "../../../../requests/PageRequest";
import useStore from "../../../../store";

const FormComponent: React.FC<any> = observer(
  ({ form, id, handleSubmit, handleChange, editValues, type }) => {
    const { LOV_STORE } = useStore();
    const { getDepartmentList } = LOV_STORE;
    const [fetchDepartment, setFetchDepartment] = useState<boolean>(true);

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        LOV_STORE.dropdown_department_list = editValues.department && [
          editValues.department,
        ];
        form.setFieldsValue({
          name: editValues.name,
          department_id: editValues.department_id,
          is_active: editValues.is_active,
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
              rules={DesignationRequest.name}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <InputBox.Select
              label="Department"
              name="department_id"
              placeholder="Select Department"
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
              onChange={handleChange}
            />
          </Col>
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
              rules={DesignationRequest.is_active}
            />
          </Col>
        </Row>
      </FormBox>
    );
  }
);

export default FormComponent;
