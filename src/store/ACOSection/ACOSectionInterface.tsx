import { ListProps } from "antd";

export type ACOSectionListDataProps = {
  id: number;
  name: string;
  desc: string;
  controller: string;
  parent_id: number;
  sort_order: number;
};

export interface ACOSectionListProps extends ListProps<any> {
  data: ACOSectionListDataProps[];
}
