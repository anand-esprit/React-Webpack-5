import React, { useState } from "react";
import { Modal, Form, Button } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

const AddComponent: React.FC<any> = observer(({ visible, close }) => {
  const { ACO_ACTION_STORE, ROOT } = useStore();
  const { AddData } = ACO_ACTION_STORE;
  const { assignErrorToInput } = ROOT;

  const [form] = Form.useForm();

  // const [disabled, setDisabled] = useState(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [fileFavIconList, setfileFavIconList] = useState<any>([]);

  const favIconProps = {
    onRemove: (file: any) => {
      const index = fileFavIconList.indexOf(file);
      const newFileList = fileFavIconList.slice();
      newFileList.splice(index, 1);
      setfileFavIconList(newFileList);
    },
    beforeUpload: (file: any) => {
      setfileFavIconList([file]);
      return false;
    },
    fileFavIconList,
  };

  const drawerClose = () => {
    close();
    form.resetFields();
  };

  const handleSubmit = (data: any) => {
    setSaving(true);
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]); // there should be values.avatar which is a File object
    }

    formData.append(
      "fav_icon",
      fileFavIconList[0] ? fileFavIconList[0] : fileFavIconList
    );

    setSaving(true);
    AddData(formData)
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

  return (
    <Modal
      centered
      title="New ACO Action"
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
          form="addACOActionForm"
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
        id="addACOActionForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        type="add"
        favIconProps={favIconProps}
      />
    </Modal>
  );
});

export default AddComponent;
