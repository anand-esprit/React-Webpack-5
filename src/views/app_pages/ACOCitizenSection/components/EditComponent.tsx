import React, { useState } from "react";
import { observer } from "mobx-react";
import { Form, Button, Drawer } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditComponent: React.FC<any> = observer(({ visible, close }) => {
  const { ACL_CITIZEN_SECTION_STORE, ROOT } = useStore();
  const { EditData, editValues } = ACL_CITIZEN_SECTION_STORE;
  const { assignErrorToInput } = ROOT;
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const [fileIconList, setFileIconList] = useState<any>([]);

  const favIconProps = {
    onRemove: (file: any) => {
      const index = fileIconList.indexOf(file);
      const newFileList = fileIconList.slice();
      newFileList.splice(index, 1);
      setFileIconList(newFileList);
    },
    beforeUpload: (file: any) => {
      console.log(file);
      setFileIconList([file]);
      return false;
    },
    fileIconList,
  };

  const handleSubmit = (data: any) => {
    setSaving(true);
    const formData = new FormData();
    for (let name in data) {
      const value = data[name];
      if (value && value !== undefined) {
        if (Array.isArray(value)) {
          name = `${name}[]`;
          value.map((item) => {
            formData.append(name, item);
          });
        } else {
          formData.append(name, value);
        }
      }
      // formData.append(name, data[name]); // there should be values.avatar which is a File object
    }

    // files['icon'] =  fileIconList[0] ? fileIconList[0] : fileIconList;
    // console.log("formData", formData);
    formData.append("icon", fileIconList[0] ? fileIconList[0] : fileIconList);

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
    <Drawer
      title="Edit ACO Citizen Section"
      width={740}
      destroyOnClose
      onClose={drawerClose}
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      open={visible}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="1"
          disabled={disabled}
          form="editACOCitizenSectionForm"
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
        id="editACOCitizenSectionForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        editValues={editValues}
        type="edit"
        iconProps={favIconProps}
      />
    </Drawer>
  );
});

export default EditComponent;
