import { ListProps } from "antd";

export type ToiletListDataProps = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export interface ToiletListProps extends ListProps<any> {
  data: ToiletListDataProps[];
}
