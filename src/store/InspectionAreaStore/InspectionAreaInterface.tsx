import { ListProps } from "antd";

export type InspectionAreaListDataProps = {
  id: number;
};

export interface InspectionAreaListProps extends ListProps<any> {
  data: InspectionAreaListDataProps[];
}
