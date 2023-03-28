import { ListProps } from "antd";

export type ChannelListDataProps = {
  id: number;
};

export interface ACLListProps extends ListProps<any> {
  data: ChannelListDataProps[];
}
