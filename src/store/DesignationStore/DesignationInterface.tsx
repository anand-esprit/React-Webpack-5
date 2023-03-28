import { ListProps } from "antd";

export type DesignationListDataProps = {
  id: number;
  code: number;
  description: string;
};

export interface DesignationListProps extends ListProps<any> {
  data: DesignationListDataProps[];
}
