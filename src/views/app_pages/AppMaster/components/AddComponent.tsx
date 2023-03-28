import React, { useState } from "react";
import { Drawer, Form, Button } from "antd";
import useStore from "../../../../store";
import FormComponent from "./FormComponent";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

const AddComponent: React.FC<any> = observer(({ visible, close }) => {
  const { APP_MASTER_STORE, ROOT } = useStore();
  const { AddData } = APP_MASTER_STORE;
  const { assignErrorToInput } = ROOT;

  const [form] = Form.useForm();

  // const [disabled, setDisabled] = useState(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const [fileLogoList, setFileLogoList] = useState<any>([]);
  const [fileFavIconList, setfileFavIconList] = useState<any>([]);

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
      "logo_url",
      fileLogoList[0] ? fileLogoList[0] : fileLogoList
    );
    formData.append(
      "fav_icon",
      fileFavIconList[0] ? fileFavIconList[0] : fileFavIconList
    );

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

  return (
    <Drawer
      title="New App Master"
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
          form="addAppMasterForm"
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
        id="addAppMasterForm"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        logoUrlProps={logoUrlProps}
        favIconProps={favIconProps}
        // fileLogoList={fileLogoList}
        // fileFavIconList={fileFavIconList}
        type="add"
      />
      {/* <MapComponent height="400px" zoom={15} /> */}
    </Drawer>
  );
});

export default AddComponent;
