import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal, Form, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FormBox, InputBox } from "../../../../components/AntdAddons";
import useStore from "../../../../store";

const StatusComponent: React.FC<any> = observer(
  ({ visible, close, viewValues, type }) => {
    const { APP_MASTER_STORE } = useStore();
    const { ChangeStatus } = APP_MASTER_STORE;
    const [saving, setSaving] = useState<boolean>(false);
    const [form] = Form.useForm();

    const handleSubmit = (data: any) => {
      setSaving(true);
      ChangeStatus(data, viewValues)
        .then(() => {
          close();
          form.resetFields();
          return;
        })
        .finally(() => setSaving(false));
    };

    return viewValues ? (
      <Modal
        centered
        title="Manage Users"
        open={visible}
        closeIcon={<FontAwesomeIcon icon={faTimes} />}
        onCancel={close}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        footer={[
          type !== "view" ? (
            <Button
              key="1"
              type="primary"
              htmlType="submit"
              form="statusForm"
              loading={saving}
            >
              Submit
            </Button>
          ) : null,
        ]}
      >
        <FormBox form={form} id="statusForm" onFinish={handleSubmit}>
          <Row gutter={20}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label={`${
                  viewValues.is_active
                    ? "Dectivate Officer User"
                    : "Activate Officer User"
                }`}
                name={`${
                  viewValues.is_active
                    ? "deactivate_officer_user"
                    : "activate_officer_user"
                }`}
                placeholder="Select Officer User"
                options={{
                  list: [
                    { id: 0, name: "No" },
                    { id: 1, name: "Yes" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <InputBox.Select
                label={`${
                  viewValues.is_active
                    ? "Dectivate Citizen User"
                    : "Activate Citizen User"
                }`}
                name={`${
                  viewValues.is_active
                    ? "deactivate_citizen_user"
                    : "activate_citizen_user"
                }`}
                placeholder="Select Citizen User"
                options={{
                  list: [
                    { id: 0, name: "No" },
                    { id: 1, name: "Yes" },
                  ],
                  valueKey: "id",
                  textKey: "name",
                }}
              />
            </Col>
          </Row>
        </FormBox>
      </Modal>
    ) : (
      <></>
    );
  }
);

export default StatusComponent;
