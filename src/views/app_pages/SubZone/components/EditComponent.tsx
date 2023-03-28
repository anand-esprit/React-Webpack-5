import React, { useState } from "react";
import { observer } from "mobx-react";
import { Form, Button, Drawer } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditComponent: React.FC<any> = observer(({ visible, close }) => {
  const { SUB_ZONE_STORE, ROOT } = useStore();
  const { EditData, editValues } = SUB_ZONE_STORE;
  const { assignErrorToInput } = ROOT;
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const handleSubmit = (data: any) => {
    setSaving(true);
    EditData(data, editValues.id)
      .then(() => {
        close();
      })
      .catch((e: any) => {
        if (e.data) {
          assignErrorToInput(form, e?.data.NOTIFICATION);
        }
      })
      .finally(() => setSaving(false));
  };

  const drawerClose = () => {
    close();
    form.resetFields();
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
    <Drawer
      title="Edit SubZone"
      placement="right"
      width={"70%"}
      open={visible}
      onClose={drawerClose}
      destroyOnClose
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      footer={[
        <Button
          key="2"
          htmlType="button"
          className="cancelBtn mr-35"
          onClick={close}
        >
          Cancel
        </Button>,
        <Button
          key="1"
          disabled={disabled}
          form="editSubZoneForm"
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
        id="editSubZoneForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        editValues={editValues}
        type="edit"
      />
    </Drawer>
  );
});

export default EditComponent;
