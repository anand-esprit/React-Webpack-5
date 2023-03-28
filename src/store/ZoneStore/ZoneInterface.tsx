import { ListProps } from "antd";

export type ZoneListDataProps = {
  id: number;
  name: string;
  code: string;
  back_color: string;
  sub_category_ids: string;
  department_id: number;
  area_km: string;
  center_loc: string;
  zoom_level: number;
  visible_to_officer: boolean;
  agency_ref_id: string;
  // description: string;
};

export interface ZoneListProps extends ListProps<any> {
  data: ZoneListDataProps[];
}
