import { ListProps } from "antd";

export type DepartmentListDataProps = {
  id: number;
  code: number;
  description: string;
};

export interface DeparmentListProps extends ListProps<any> {
  data: DepartmentListDataProps[];
}
