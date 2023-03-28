import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { CategoryListDataProps } from "./CategoryInterface";

export default class CategoryStore {
  agGrid: any = null;
  per_page = Config.grid.local.gridOptions?.paginationPageSize;
  public list_data?: CategoryListDataProps[];
  editValues = null;
  deleteValues = null;
  viewRoleValues = null;

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
    this.editValues = null;
    return axios
      .post(API_URL.CATEGORY.VIEW + "/" + data.id)
      .then(({ data }) => {
        this.editValues = data.view;
      });
    // this.editValues = data;
  };

  // Setter Functions
  private setListData = (value?: CategoryListDataProps[]): void => {
    this.list_data = value;
    // console.log(toJS(this.list_data));
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setListData([]);
    return await axios
      .post(API_URL.CATEGORY.LIST)
      .then(({ data }) => {
        console.log("first");
        // this.list_data = data.categories;
        this.setListData(data.categories);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    return axios
      .post(API_URL.CATEGORY.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.CATEGORY.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.CATEGORY.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  ChangeStatus = (data: any, id: number) => {
    const api_link =
      data === true ? API_URL.CATEGORY.ACTIVATE : API_URL.CATEGORY.DEACTIVATE;
    return axios
      .patch(api_link + "/" + id)
      .then(() => {
        // return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  ViewData = (id: number, type: string) => {
    return axios
      .post(API_URL.CATEGORY.VIEW + "/" + id, type)
      .then(({ data }) => {
        this.viewRoleValues = data.view.user_role_detail;
        // console.log("this.viewValues ", this.viewValues);
      });
  };
}
