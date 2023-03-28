import React, { useState } from "react";
import { Modal, Form, Button } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

const AddComponent: React.FC<any> = observer(({ visible, close }) => {
  const { ACO_SECTION_STORE, ROOT } = useStore();
  const { AddData } = ACO_SECTION_STORE;
  const { assignErrorToInput } = ROOT;

  const [form] = Form.useForm();

  // const [disabled, setDisabled] = useState(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const drawerClose = () => {
    close();
    form.resetFields();
  };

  const handleSubmit = (data: any) => {
    setSaving(true);
    AddData(data)
      .then(() => {
        form.resetFields();
        close();
      })
      .catch((e: any) => {
        if (e.data) {
          assignErrorToInput(form, e?.data.NOTIFICATION);
        }
      })
      .finally(() => setSaving(false));
  };

  const handleChange = debounce(() => {
    form
      .validateFields()
      .then(() => {
        setDisabled(false);
      })
      .catch(() => {
        setDisabled(true);
      });
  }, 500);

  return (
    <Modal
      centered
      title="New ACO Section"
      width={740}
      open={visible}
      onCancel={drawerClose}
      destroyOnClose
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="1"
          disabled={disabled}
          form="addACOSectionForm"
          loading={saving}
          htmlType="submit"
          type="primary"
        >
          Save
        </Button>,
      ]}
    >
      <FormComponent
        form={form}
        id="addACOSectionForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        type="add"
      />
    </Modal>
  );
});

export default AddComponent;
