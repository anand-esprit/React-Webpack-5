import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { ChannelListDataProps } from "./ChannelInterface";

export default class ChannelStore {
  agGrid: any = null;
  per_page = Config.grid.local.gridOptions?.paginationPageSize;
  public list_data?: ChannelListDataProps[];
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
    this.editValues = data;
  };

  // Setter Functions
  private setListData = (value?: ChannelListDataProps[]): void => {
    this.list_data = value;
    // console.log(toJS(this.list_data));
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setListData([]);
    return await axios
      .post(API_URL.CHANNEL.LIST)
      .then(({ data }) => {
        this.setListData(data.list);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    return axios
      .post(API_URL.CHANNEL.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.CHANNEL.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.CHANNEL.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  ChangeStatus = (data: any, id: number) => {
    const api_link =
      data === true ? API_URL.CHANNEL.ACTIVATE : API_URL.CHANNEL.DEACTIVATE;
    return axios
      .patch(api_link + "/" + id)
      .then(() => {
        // return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  // ViewData = (id: number, type: string) => {
  //   return axios
  //     .post(API_URL.CHANNEL.VIEW + "/" + id, type)
  //     .then(({ data }) => {
  //       this.viewRoleValues = data.view.user_role_detail;
  //       // console.log("this.viewValues ", this.viewValues);
  //     });
  // };
}
