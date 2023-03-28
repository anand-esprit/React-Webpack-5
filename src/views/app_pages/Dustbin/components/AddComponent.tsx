import React, { useState } from "react";
import { Modal, Form, Button } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

const AddComponent: React.FC<any> = observer(({ visible, close }) => {
  const { DUSTBIN_STORE, ROOT } = useStore();
  const { AddData } = DUSTBIN_STORE;
  const { assignErrorToInput } = ROOT;

  const [form] = Form.useForm();

  // const [disabled, setDisabled] = useState(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [iconList, setIconList] = useState<any>([]);

  const handleSubmit = (data: any) => {
    setSaving(true);
    const formData = new FormData();
    for (const name in data) {
      if (data[name] !== undefined) {
        formData.append(name, data[name]); // there should be values.avatar which is a File object
      }
    }
    if (iconList.length > 0) {
      console.log("iconList", iconList);
      formData.append("icon", iconList[0] ? iconList[0] : iconList);
    }

    AddData(formData)
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

  const iconFileProps = {
    onRemove: (file: any) => {
      const index = iconList.indexOf(file);
      const newFileList = iconList.slice();
      newFileList.splice(index, 1);
      setIconList(newFileList);
    },
    beforeUpload: (file: any) => {
      setIconList([file]);
      return false;
    },
    iconList,
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
    <Modal
      title="New Dustbin"
      width={740}
      open={visible}
      centered
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
          form="addDustbinForm"
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
        id="addDustbinForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        iconFileProps={iconFileProps}
        // iconList={iconList}
        type="add"
      />
    </Modal>
  );
});

export default AddComponent;
