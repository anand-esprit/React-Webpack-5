import { ListProps } from "antd";

export type IssueStatusCodeListDataProps = {
  id: number;
  code: number;
  name: string;
  desc: string;
};

export interface IssueStatusCodeListProps extends ListProps<any> {
  data: IssueStatusCodeListDataProps[];
}
