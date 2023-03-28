import { ListProps } from "antd";

export type PriorityListDataProps = {
  id: number;
  code: number;
  description: string;
};

export interface PriorityListProps extends ListProps<any> {
  data: PriorityListDataProps[];
}
