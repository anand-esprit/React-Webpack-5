import { ListProps } from "antd";

export type TaskStatusCodeListDataProps = {
  id: number;
  code: number;
  status_name: string;
  desc: string;
};

export interface TaskStatusCodeListProps extends ListProps<any> {
  data: TaskStatusCodeListDataProps[];
}
