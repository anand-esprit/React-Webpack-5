import { ListProps } from "antd";

export type CitizenMenuGroupListDataProps = {
  id: number;
  name: string;
  name_hi: string;
};

export interface CitizenMenuGroupListProps extends ListProps<any> {
  data: CitizenMenuGroupListDataProps[];
}
