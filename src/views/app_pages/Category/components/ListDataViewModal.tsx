import React from "react";
import { observer } from "mobx-react";
import { Modal, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ListDataViewComponent: React.FC<any> = observer(
  ({ visible, close, viewRoleValues }) => {
    const Rolecolumns = [
      {
        title: "User Role",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Code",
        dataIndex: "code",
        key: "code",
      },
    ];

    return (
      <Modal
        centered
        title="View"
        width={740}
        open={visible}
        closeIcon={<FontAwesomeIcon icon={faTimes} />}
        onCancel={close}
        footer={null}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {viewRoleValues && (
          <Table
            dataSource={viewRoleValues}
            columns={Rolecolumns}
            pagination={false}
          />
        )}
      </Modal>
    );
  }
);

export default ListDataViewComponent;
