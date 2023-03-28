import { ListProps } from "antd";

export type UserRoleListDataProps = {
  id: number;
  code: number;
  description: string;
};

export interface UserRoleListProps extends ListProps<any> {
  data: UserRoleListDataProps[];
}
