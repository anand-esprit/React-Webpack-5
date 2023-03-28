import React, { useState } from "react";
import { observer } from "mobx-react";
import { Modal, Form, Button } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditComponent: React.FC<any> = observer(({ visible, close }) => {
  const { TOPIC_STORE, ROOT } = useStore();
  const { EditData, editValues } = TOPIC_STORE;
  const { assignErrorToInput } = ROOT;
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [iconList, setIconList] = useState<any>([]);

  const handleSubmit = (data: any) => {
    setSaving(true);
    const formData = new FormData();
    for (const name in data) {
      if (data[name] !== undefined) {
        formData.append(name, data[name]); // there should be values.avatar which is a File object
      }
    }

    formData.append("sort_order", data.sort_order ? data.sort_order : 1);

    if (iconList.length > 0) {
      formData.append("icon", iconList[0] ? iconList[0] : iconList);
    }

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
      title="Edit Topic"
      width={740}
      onCancel={drawerClose}
      centered
      destroyOnClose
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      open={visible}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="1"
          disabled={disabled}
          form="editTopicForm"
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
        id="editTopicForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        editValues={editValues}
        iconFileProps={iconFileProps}
        // iconList={iconList}
        // setIconList={setIconList}
        type="edit"
      />
    </Modal>
  );
});

export default EditComponent;
