import { ListProps } from "antd";

export type SubCategoryListDataProps = {
  id: number;
};

export interface SubCategoryProps extends ListProps<any> {
  data: SubCategoryListDataProps[];
}
