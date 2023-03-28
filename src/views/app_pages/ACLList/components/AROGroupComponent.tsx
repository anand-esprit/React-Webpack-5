import React from "react";
import { observer } from "mobx-react";
import { Modal, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AROGroupComponent: React.FC<any> = observer(
  ({
    visible,
    close,
    viewAROGroupValues,
    viewACOActionValues,
    viewAROUserValues,
  }) => {
    const Rolecolumns = [
      {
        title: "ARO Group Name",
        dataIndex: "name",
        key: "name",
      },
    ];
    const renderCustomCell = (object: any) => {
      return object?.name ?? "";
    };

    const Usercolumns = [
      {
        title: "User Name",
        dataIndex: "full_name",
        key: "full_name",
      },
      {
        title: "Role",
        dataIndex: "user_role",
        key: "user_role",
        render: (object: any) => renderCustomCell(object),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "full_name",
      },
      {
        title: "Mobile Number",
        dataIndex: "mobile_number",
        key: "mobile_number",
      },
    ];

    const ActionColumns = [
      {
        title: "Section",
        dataIndex: "controller_name",
        key: "controller_name",
      },
      {
        title: "Action",
        dataIndex: "name",
        key: "name",
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
        {viewAROGroupValues && (
          <Table
            dataSource={viewAROGroupValues}
            columns={Rolecolumns}
            pagination={false}
          />
        )}
        {viewAROUserValues && (
          <Table
            dataSource={viewAROUserValues}
            columns={Usercolumns}
            pagination={false}
          />
        )}
        {viewACOActionValues && (
          <Table
            dataSource={viewACOActionValues}
            columns={ActionColumns}
            pagination={false}
            scroll={{ y: "calc(90vh - 215px)" }}
          />
        )}
      </Modal>
    );
  }
);

export default AROGroupComponent;
