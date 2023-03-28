import { ListProps } from "antd";

export type ACLListDataProps = {
  id: number;
};

export interface ACLListProps extends ListProps<any> {
  data: ACLListDataProps[];
}
