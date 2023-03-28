import axios from "axios";
import { makeAutoObservable } from "mobx";
import API_URL from "../../config/ApiUrl";
import Config from "../../config/Config";
import { AppMasterListProps } from "./AppMasterInterface";

export default class AppMasterStore {
  agGrid: any = null;
  per_page = Config.grid.local.gridOptions?.paginationPageSize;
  public list_data?: AppMasterListProps[];
  editValues = null;
  deleteValues = null;

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
  private setListData = (value?: AppMasterListProps[]): void => {
    this.list_data = value;
  };

  // API Functions
  public fetchList = async (): Promise<any> => {
    this.setListData([]);
    return await axios
      .get(API_URL.APP_MASTER.LIST)
      .then(({ data }) => {
        this.setListData(data.list);
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  AddData = (formData: any) => {
    console.log("formData", formData);
    return axios
      .post(API_URL.APP_MASTER.ADD, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  DeleteData = (id: number) => {
    return axios
      .delete(API_URL.APP_MASTER.DESTROY + `/${id}`)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  EditData = (formData: any, editId: number) => {
    return axios
      .post(API_URL.APP_MASTER.EDIT + "/" + editId, formData)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };

  ChangeStatus = (data: any, rawData: any) => {
    const api_link = rawData.is_active
      ? API_URL.APP_MASTER.DEACTIVATE
      : API_URL.APP_MASTER.ACTIVATE;
    return axios
      .patch(api_link + "/" + rawData.id, data)
      .then(() => {
        return this.fetchList();
      })
      .catch((response) => {
        return Promise.reject(response);
      });
  };
}
