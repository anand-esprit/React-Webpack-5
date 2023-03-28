import { ListProps } from "antd";

export type CategoryListDataProps = {
  id: number;
};

export interface ACLListProps extends ListProps<any> {
  data: CategoryListDataProps[];
}
