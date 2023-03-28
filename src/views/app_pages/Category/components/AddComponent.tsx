import React, { useState } from "react";
import { Modal, Form, Button } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";
import { dataToFormdataConverter } from "../../../../config/Global";

const AddComponent: React.FC<any> = observer(({ visible, close }) => {
  const { CATEGORY_STORE, ROOT } = useStore();
  const { AddData } = CATEGORY_STORE;
  const { assignErrorToInput } = ROOT;

  const [form] = Form.useForm();

  // const [disabled, setDisabled] = useState(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [fileIconList, setFileIconList] = useState<any>([]);
  const [isImageUploaded, setisImageUploaded] = useState(false);

  const handleSubmit = (data: any) => {
    setSaving(true);

    if (fileIconList.length > 0 && isImageUploaded) {
      data.icon = fileIconList[0] ? fileIconList[0] : fileIconList;
    }
    const formData = dataToFormdataConverter(data);

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

  const drawerClose = () => {
    close();
    form.resetFields();
  };

  return (
    <Modal
      title="New Category"
      width={740}
      open={visible}
      onCancel={drawerClose}
      destroyOnClose
      centered
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="1"
          disabled={disabled}
          form="addCategoryForm"
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
        id="addCategoryForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        fileIconList={fileIconList}
        setFileIconList={setFileIconList}
        setisImageUploaded={setisImageUploaded}
        type="add"
      />
    </Modal>
  );
});

export default AddComponent;
