import React from "react";
import { observer } from "mobx-react";
import { Modal, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AssignToViewModal: React.FC<any> = observer(
  ({
    visible,
    close,
    viewAROGroupValues,
    viewACOActionValues,
    viewAROUserValues,
    viewOSNameValues,
    viewDepartmentValues,
    viewDesignationValues,
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
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Nav Name",
        dataIndex: "nav_name",
        key: "nav_name",
      },
    ];

    const OSNameColumns = [
      {
        title: "OS Name",
        dataIndex: "name",
        key: "name",
        render: (object: any) => object,
      },
    ];

    const DepartmentColumns = [
      {
        title: "Department",
        dataIndex: "name",
        key: "name",
      },
    ];

    const DesignationColumns = [
      {
        title: "Designation",
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
        {viewOSNameValues && (
          <Table
            dataSource={viewOSNameValues}
            columns={OSNameColumns}
            pagination={false}
          />
        )}
        {viewDepartmentValues && (
          <Table
            dataSource={viewDepartmentValues}
            columns={DepartmentColumns}
            pagination={false}
          />
        )}
        {viewDesignationValues && (
          <Table
            dataSource={viewDesignationValues}
            columns={DesignationColumns}
            pagination={false}
          />
        )}
      </Modal>
    );
  }
);

export default AssignToViewModal;
