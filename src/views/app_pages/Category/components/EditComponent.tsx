import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Form, Button } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { dataToFormdataConverter } from "../../../../config/Global";

const EditComponent: React.FC<any> = observer(({ visible, close }) => {
  const { CATEGORY_STORE, ROOT } = useStore();
  const { EditData, editValues } = CATEGORY_STORE;
  const { assignErrorToInput } = ROOT;
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [fileIconList, setFileIconList] = useState<any>([]);
  const [isImageUploaded, setisImageUploaded] = useState(false);

  const handleSubmit = (data: any) => {
    setSaving(true);
    console.log("fileIconList", fileIconList);
    if (fileIconList.length > 0 && isImageUploaded) {
      data.icon = fileIconList[0] ? fileIconList[0] : fileIconList;
    }
    const formData = dataToFormdataConverter(data);

    EditData(formData, editValues.id)
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
    <Modal
      title="Edit Category"
      width={740}
      destroyOnClose
      centered
      onCancel={drawerClose}
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      open={visible}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="1"
          disabled={disabled}
          form="editCategoryForm"
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
        id="editCategoryForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        editValues={editValues}
        fileIconList={fileIconList}
        setFileIconList={setFileIconList}
        setisImageUploaded={setisImageUploaded}
        type="edit"
      />
    </Modal>
  );
});

export default EditComponent;
