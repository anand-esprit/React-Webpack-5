import { ListProps } from "antd";

export type ChallanStatusCodeListDataProps = {
  id: number;
  code: number;
  name: string;
  desc: string;
};

export interface ChallanStatusCodeListProps extends ListProps<any> {
  data: ChallanStatusCodeListDataProps[];
}
