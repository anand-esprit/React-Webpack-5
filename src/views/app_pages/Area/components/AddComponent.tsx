import React, { useState } from "react";
import { Form, Button, Drawer } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

const AddComponent: React.FC<any> = observer(({ visible, close }) => {
  const { AREA_STORE, ROOT, LOV_STORE } = useStore();
  const { getWardList } = LOV_STORE;
  const { AddData } = AREA_STORE;
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
        close();
        form.resetFields();
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

  const handleZoneChange = () => {
    const zone_id = form.getFieldValue("zone_id");

    form.setFieldsValue({ ward_id: null });
    if (zone_id && zone_id !== undefined) {
      const parent_ids = [zone_id];
      const data = { parent_ids };
      getWardList(data);
    }
  };

  return (
    <Drawer
      title="New Area"
      placement="right"
      width={"70%"}
      open={visible}
      onClose={drawerClose}
      destroyOnClose
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="1"
          disabled={disabled}
          form="addAreaForm"
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
        id="addAreaForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleZoneChange={handleZoneChange}
        type="add"
      />
    </Drawer>
  );
});

export default AddComponent;
