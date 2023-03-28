import { ListProps } from "antd";

export type DustbinListDataProps = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export interface DustbinListProps extends ListProps<any> {
  data: DustbinListDataProps[];
}
