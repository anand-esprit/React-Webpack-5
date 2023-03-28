import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { UserRoleListProps } from "./UserRoleInterface";

export default class UserRoleStore {
  agGrid: any = null;
  per_page = Config.grid.local.gridOptions?.paginationPageSize;
  public list_data?: UserRoleListProps[];
  editValues = null;
  deleteValues = null;
  dropdown_user_role_list = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Setup grid and set column size to autosize
  setupGrid = (params: any) => {
    this.agGrid = params;
  };

  // change page size, default page size is LocalGridConfig.options.paginationPageSize
  setPageSize = (page = this.per_page) => {
    this.per_page = page;
    if (this.agGrid) {
      this.agGrid.api.paginationSetPageSize(Number(page));
    }
  };

  setDeleteValues = (data: any) => {
    this.deleteValues = data;
  };

  setEditValues = (data: any) => {
    this.editValues = data;
  };

  // Setter Functions
  private setListData = (value?: UserRoleListProps[]): void => {
    this.list_data = value;
    // console.log(toJS(this.list_data));
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setListData([]);
    return await axios
      .post(API_URL.USER_ROLE.LIST)
      .then(({ data }) => {
        this.setListData(data.user_roles);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    console.log("formData", formData);
    return axios
      .post(API_URL.USER_ROLE.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.USER_ROLE.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.USER_ROLE.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };
}
