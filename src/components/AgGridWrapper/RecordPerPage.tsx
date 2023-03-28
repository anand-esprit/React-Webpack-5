import React from "react";
import { observer } from "mobx-react";
import { Select } from "antd";
import { CONSTANT } from "../../config/Constant";

const RecordPerPage: React.FC<any> = observer((props) => {
  return (
    <Select {...props}>
      {CONSTANT.PER_PAGE_RECORD.map((item: any) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.value}
          </Select.Option>
        );
      })}
    </Select>
  );
});

export default RecordPerPage;
