import { ListProps } from "antd";

export type SubZoneListDataProps = {
  id: number;
  name: string;
  code: string;
  back_color: string;
  sub_category_ids: string;
  department_id: number;
  area_km: string;
  center_loc: string;
  zoom_level: number;
  // description: string;
};

export interface SubZoneListProps extends ListProps<any> {
  data: SubZoneListDataProps[];
}
