import { ListProps } from "antd";

export type ChecklistCategoryListDataProps = {
  id: number;
};

export interface ChecklistCategoryProps extends ListProps<any> {
  data: ChecklistCategoryListDataProps[];
}
