import { ListProps } from "antd";

export type TopicListDataProps = {
  id: number;
  name: string;
  name_hi: string;
};

export interface TopicListProps extends ListProps<any> {
  data: TopicListDataProps[];
}
