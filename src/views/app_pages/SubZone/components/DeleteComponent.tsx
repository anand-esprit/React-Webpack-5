import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../../store";

const DeleteComponent: React.FC<any> = observer(({ visible, close }) => {
  const { SUB_ZONE_STORE, ROOT } = useStore();
  const { DeleteData, deleteValues } = SUB_ZONE_STORE;
  const { assignErrorToInput } = ROOT;

  const [saving, setSaving] = useState<boolean>(false);

  const deleterecord = () => {
    setSaving(true);
    const id = deleteValues.id;
    DeleteData(id)
      .then(() => {
        close();
      })
      .catch((e: any) => {
        if (e.data) {
          assignErrorToInput(e?.data.NOTIFICATION);
        }
      })
      .finally(() => setSaving(false));
  };

  return deleteValues ? (
    <Modal
      centered
      className="deleteModal"
      title="Delete Designation"
      open={visible}
      closeIcon={<FontAwesomeIcon icon={faTimes} />}
      onCancel={close}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      footer={[
        <Button key="2" htmlType="button" className="cancelBtn" onClick={close}>
          Cancel
        </Button>,
        <Button
          key="1"
          htmlType="button"
          type="primary"
          loading={saving}
          onClick={deleterecord}
        >
          Delete
        </Button>,
      ]}
    >
      <div className="deleteNote">
        Are you sure want to delete <span>{deleteValues.name}</span>
        <span>{deleteValues.controller}</span>?
      </div>
    </Modal>
  ) : (
    <></>
  );
});

export default DeleteComponent;
