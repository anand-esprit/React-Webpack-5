import { ListProps } from "antd";


export type AgencyListDataProps = {
  id: number;
  name: string;
  name_hi: string;
};

export interface AgenciesListProps extends ListProps<any> {
  data: AgencyListDataProps[];
}

