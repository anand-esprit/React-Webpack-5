import React, { useEffect } from "react";
import { Col, Row} from "antd";
import { observer } from "mobx-react";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import { AgencyRequest } from "../../../../requests/PageRequest";

const FormComponent: React.FC<any> = observer(
  ({
    form,
    id,
    handleSubmit,
    handleChange,
    editValues,
    type,
  }) => {

    // set the form values to edit
    useEffect(() => {
      if (editValues && type === "edit") {
        form.setFieldsValue({
          name: editValues.name,
          type: editValues.type,
        });
      }
    }, [editValues, form]);


    return (
      <>

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
                rules={AgencyRequest.name}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Text
                label="Type"
                placeholder="Type"
                name="type"
                onChange={handleChange}
                rules={AgencyRequest.type}
              />
            </Col>
          </Row>
        </FormBox>
      </>
    );
  }
);

export default FormComponent;
