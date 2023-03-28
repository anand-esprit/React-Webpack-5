import { ListProps } from "antd";

export type ACOActionListDataProps = {
  id: number;
  name: string;
  desc: string;
  action: string;
  controller: string;
  controller_name: string;
  sort_order: number;
};

export interface ACOActionListProps extends ListProps<any> {
  data: ACOActionListDataProps[];
}
