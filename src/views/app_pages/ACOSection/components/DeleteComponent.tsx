import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../../../store";

const DeleteComponent: React.FC<any> = observer(({ visible, close }) => {
  const { ACO_SECTION_STORE, ROOT } = useStore();
  const { DeleteData, deleteValues } = ACO_SECTION_STORE;
  const { assignErrorToInput } = ROOT;

  const [saving, setSaving] = useState<boolean>(false);

  const deleteRecord = () => {
    setSaving(true);
    const id = deleteValues.id;
    // console.log(id);return false;
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
      title="Delete ACO Section"
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
          onClick={deleteRecord}
        >
          Delete
        </Button>,
      ]}
    >
      <div className="deleteNote">
        Are you sure want to delete <span>{deleteValues.name}</span>?
      </div>
    </Modal>
  ) : (
    <></>
  );
});

export default DeleteComponent;
