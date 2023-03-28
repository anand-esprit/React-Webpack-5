import { ListProps } from "antd";

export type ACOOfficerSectionDataProps = {
  id: number;
  nav_name: string;
  desc: string;
  name: string;
  next_interface: string;
  value: string;
  action: string;
  sort_order: number;
  parent_id: number;
  web_url: string;
  place_call: string;
  email: string;
  view_opt: string;
};

export interface ACOOfficerSectionListProps extends ListProps<any> {
  data: ACOOfficerSectionDataProps[];
}
