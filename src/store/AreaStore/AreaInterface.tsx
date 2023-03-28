import { ListProps } from "antd";

export type AreaListDataProps = {
  id: number;
  name: string;
  code: string;
  ward_id: number;
  zone_id: number;
  geo_address: string;
  area_km: string;
  back_color: string;
  center_loc: string;
  zoom_level: number;
  geo_loc: string;
  show_defined_area: boolean;
};

export interface AreaListProps extends ListProps<any> {
  data: AreaListDataProps[];
}
