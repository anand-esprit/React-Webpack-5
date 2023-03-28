import React, { useState } from "react";
import { observer } from "mobx-react";
import { Drawer, Form, Button } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditComponent: React.FC<any> = observer(({ visible, close }) => {
  const { APP_MASTER_STORE, ROOT } = useStore();
  const { EditData, editValues } = APP_MASTER_STORE;
  const { assignErrorToInput } = ROOT;
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const [fileLogoList, setFileLogoList] = useState<any>([]);
  const [fileFavIconList, setfileFavIconList] = useState<any>([]);

  const handleSubmit = (data: any) => {
    setSaving(true);
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]); // there should be values.avatar which is a File object
    }

    if (fileLogoList.length > 0) {
      formData.append(
        "logo_url",
        fileLogoList[0] ? fileLogoList[0] : fileLogoList
      );
    }

    if (fileFavIconList.length > 0) {
      formData.append(
        "fav_icon",
        fileFavIconList[0] ? fileFavIconList[0] : fileFavIconList
      );
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

  const logoUrlProps = {
    onRemove: (file: any) => {
      const index = fileLogoList.indexOf(file);
      const newFileList = fileLogoList.slice();
      newFileList.splice(index, 1);
      setFileLogoList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileLogoList([file]);
      return false;
    },
    fileLogoList,
  };

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
      title="Edit App Master"
      placement="right"
      width={"70%"}
      onClose={drawerClose}
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
          form="editAppMasterForm"
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
        id="editAppMasterForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        logoUrlProps={logoUrlProps}
        favIconProps={favIconProps}
        editValues={editValues}
        // setFileLogoList={setFileLogoList}
        // fileLogoList={fileLogoList}
        // setfileFavIconList={setfileFavIconList}
        // fileFavIconList={fileFavIconList}
        type="edit"
      />
    </Drawer>
  );
});

export default EditComponent;
