import React from "react";
import { Button, Space } from "antd";
import useStore from "../../../../../store";

const HeaderButtons: React.FC<any> = ({ open }) => {
  const { AUTH } = useStore();

  return AUTH.checkPermission("new") ? (
    <Space className="headerBtn">
      <Button className="addBtn" onClick={open}>
        Create
      </Button>
    </Space>
  ) : (
    <></>
  );
};

export default HeaderButtons;
