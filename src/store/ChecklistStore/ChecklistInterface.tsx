import { ListProps } from "antd";

export type ChecklistDataProps = {
  id: number;
};

export interface ChecklistListProps extends ListProps<any> {
  data: ChecklistDataProps[];
}
